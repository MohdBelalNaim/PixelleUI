<script setup lang="ts">
import { API_URL, FILE_URL } from "~/composable/useURLs";
import { projectStore, result } from "~/store/create.store";

definePageMeta({
  layout: "editor",
});

const route = useRoute();

projectStore.value.id = route.params.id as string;

const tabs = ["index.html", "style.css", "script.js"];
const selectedTab = ref<string>("index.html");

function getIcon(tab: string) {
  if (tab.endsWith("html")) return "html";
  else if (tab.endsWith("css")) return "css";
  else return "javascript";
}

function getProjectDetails() {
  if (route.query?.new) return;

  fetch(API_URL + "projects/?id=" + route.params.id)
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        const data = res.success[0];
        getFileContent(data.files);
        projectStore.value = {
          ...data,
          title: data.name,
          tags: data.tags.split(","),
          uploaded: true,
        };
      }
    });
}

async function getText(filename: string) {
  return fetch(`${FILE_URL}${route.params.id}/${filename}`, {
    cache: "no-store",
  })
    .then((res) => res.text())
    .then((text) => text);
}

async function getFileContent(files: string) {
  let fileList = files?.split(",");
  projectStore.value.fileLength = fileList.length;
  if (fileList.length > 1) {
    fileList.forEach(async (file) => {
      if (file.endsWith("html")) {
        let text = await getText(file.trim());
        projectStore.value.html = text;
      }
      if (file.endsWith("css")) {
        let text = await getText(file.trim());
        projectStore.value.css = text;
      }
      if (file.endsWith("js")) {
        let text = await getText(file.trim());
        projectStore.value.javascript = text;
      }
    });
  } else {
    let text = await getText(fileList[0]);
    projectStore.value.html = text;
  }
}

onMounted(() => {
  getProjectDetails();
});
</script>

<template>
  <section class="wrapper">
    <section class="tab-container code-container">
      <header>
        <button
          v-for="tab in tabs"
          @click="selectedTab = tab"
          :class="{ active: selectedTab === tab }"
        >
          <img
            :src="`/icons/${getIcon(tab)}.svg`"
            :alt="tab + 'logo'"
            width="16"
          />
          {{ tab }}
        </button>
      </header>

      <div class="relative aspect-square min-h-80 sm:aspect-auto">
        <CodeEditor
          v-for="(tab, index) in tabs"
          :id="index + 1"
          :lang="getIcon(tab)"
          v-show="selectedTab == tab"
          :text="projectStore[getIcon(tab)]"
          @change="(text) => (projectStore[getIcon(tab)] = text)"
        />
      </div>
    </section>

    <iframe
      :srcdoc="result"
      frameborder="0"
      class="bg-gray-50 w-full h-full min-h-80 aspect-square sm:aspect-auto"
    ></iframe>
  </section>
</template>

<style scoped>
.wrapper {
  height: calc(100dvh - 70px);
  @apply grid md:grid-cols-2;
}

.tab-container {
  width: 100%;
  display: grid;
  grid-template-rows: max-content auto;
  background-color: #0f172a;

  header {
    display: flex;
    align-items: center;
    overflow-x: auto;

    button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      transition: 0.3s ease;
    }

    .active {
      background-color: var(--background);
      color: aliceblue;
    }
  }
}
</style>
