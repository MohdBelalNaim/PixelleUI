<script setup lang="ts">
import { useTitle } from "~/composable/useTitle";
import { FILE_URL } from "~/composable/useURLs";
import { useProjects } from "~/store/projects.store";
import VCodeBlock from "@wdns/vue-code-block";
import type { IProject } from "~/store/projects.interface";
import { useUser } from "~/composable/useUser";

definePageMeta({
  layout: "custom",
});

const projects = useProjects();
const user = useUser();

const route = useRoute();
const { name } = route.params;

const title = useTitle();
const selectedTab = ref<string>("index.html");
const code = ref("");

const getProject = ref<IProject>();

watch(
  [projects, route.params],
  () => {
    if (projects.value) {
      let project = projects.value.find((p) => p.id == name);
      title.value = project?.name;
      getProject.value = project;
    }
  },
  { deep: true, immediate: true }
);

function loadText() {
  fetch(`${FILE_URL}${name}/${selectedTab.value}`, {
    cache: "no-store",
  })
    .then((d) => d.text())
    .then((d) => {
      code.value = d;
    });
}

function getIcon(tab: string) {
  if (tab.endsWith("html")) return "html";
  else if (tab.endsWith("css")) return "css";
  else return "javascript";
}

watch(selectedTab, loadText);

onMounted(loadText);
</script>
<template>
  <div class="wrapper">
    <section class="tab-container code-container">
      <header>
        <button
          v-if="getProject"
          v-for="tab in getProject?.files.split(',')"
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
      <div class="relative">
        <VCodeBlock
          code-block-radius="0"
          :code="code"
          :lang="getIcon(selectedTab)"
          highlightjs
          :css-path="import('~/assets/css/shades-of-purple.css')"
          theme="false"
        />
        <CopyButton :text="code" />
      </div>
    </section>

    <!-- output panel -->
    <section class="tab-container output">
      <header class="h-9 px-1">
        <NuxtLink
          v-if="user?.id == getProject?.userid"
          :to="`/create/${getProject?.id}`"
          class="icon-btn mr-8"
        >
          <img src="/icons/desktop.svg" class="w-5 invert" />
          <span>Edit</span>
        </NuxtLink>

        <NuxtLink :to="'/user/' + getProject?.userid" class="user">
          <img :src="getProject?.picture" alt="user avater" />
          <span>{{ getProject?.user }}</span>
        </NuxtLink>
      </header>
      <iframe
        id="frame"
        :src="`${FILE_URL}${name}/index.html`"
        frameborder="0"
        class="border-l border-slate-800 max-sm:aspect-square"
        allow="camera"
      ></iframe>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100%;
  overflow: hidden;
  background-color: #0f172a;

  iframe {
    width: 100%;
    height: 100%;
    align-self: end;
    background-color: var(--background);
  }
}

header button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  transition: 0.3s ease;
}

@media screen and (width<600px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
  .output {
    grid-row-start: 1;
  }
}

.icon-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tab-container {
  display: grid;
  grid-template-rows: max-content auto;

  header {
    display: flex;
    align-items: center;

    .active {
      background-color: var(--background);
      color: aliceblue;
    }

    .user {
      margin-block: 3px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      border-radius: 16px;
      white-space: nowrap;
      padding: 4px 8px 4px 6px;
      margin-left: auto;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      cursor: pointer;
    }

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }

  .code_container {
    width: 100%;
    height: 100%;
    outline: none;
    padding: 16px;
    font-size: 16px;
    font-family: consolas, monospace;
    resize: none;
    text-wrap-style: pretty;
    background-color: transparent;
    background-color: var(--background);
  }
}
</style>
