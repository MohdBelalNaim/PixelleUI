<script setup lang="ts">
import { showAlert } from "~/composable/useAlert";
import { API_URL } from "~/composable/useURLs";

const modelValue = defineModel({ default: false });

const uploading = ref<boolean>(false);

const formData = ref<FormData | null>();
const router = useRouter();

async function uploadFiles(event: Event) {
  formData.value = new FormData(event.target as HTMLFormElement);
  uploading.value = true;

  fetch(API_URL + "project/create/", {
    method: "post",
    body: formData.value,
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (res?.success) {
        await nextTick();
        showAlert(res.success?.message);
        setTimeout(() => {
          router.push("/components/" + res.success?.id);
        }, 250);
      } else {
        showAlert(res.error);
      }
    })
    .catch((res) => {
      showAlert(res.error.message);
    })
    .finally(() => {
      uploading.value = false;
      (event.target as HTMLFormElement).reset();
      modelValue.value = false;
    });
}

const preview = ref("");

function onDrop(files: any) {
  formData.value?.append("files", files);
  if (
    (files.length == 1 && files[0].name.endsWith("htm")) ||
    files[0].name.endsWith("html")
  ) {
    preview.value = URL.createObjectURL(files[0]);
  }
}

const tag = ref<string>("");
const tags = ref<string[]>([]);

watch(modelValue, () => {
  if (!modelValue.value) {
    document.forms[0].reset();
    tags.value = [];
    tag.value = "";
  }
});

function createTag(event: KeyboardEvent) {
  if (event.key == "," || event.key == "Enter") {
    tags.value.push(event.key == "Enter" ? tag.value : tag.value.slice(0, -1));
    tag.value = "";
  }
}

function deleteTag(index: number) {
  tags.value.splice(index, 1);
}
</script>

<template>
  <section
    @click.self="modelValue = false"
    class="fixed z-50 inset-0 grid place-items-center bg-black/40 backdrop-blur-sm"
    :class="{ hidden: !modelValue }"
  >
    <div
      class="flex flex-wrap gap-8 bg-bg border w-[min(1100px,90%)] rounded-xl border-slate-800 px-8 mx-auto max-h-[80dvh] overflow-auto"
    >
      <form
        @submit.prevent="uploadFiles"
        enctype="multipart/form-data"
        class="flex-1 basis-80 max-sm:mt-0 grid gap-6 content-start py-8 w-full mx-auto rounded-md"
      >
        <div
          @click="modelValue = false"
          class="flex items-center justify-between"
        >
          <h3 class="text-2xl font-bold text-primary">Upload files</h3>
          <div class="cursor-pointer">
            <img
              src="/icons/close-transition.svg"
              class="invert w-7"
              alt="close"
            />
          </div>
        </div>

        <input type="text" name="name" placeholder="Project name" required />

        <DragDrop @drop="onDrop" />

        <div v-if="tags.length" class="flex flex-wrap gap-2">
          <Tag
            v-for="(tag, index) in tags"
            :key="tag"
            :tag
            @delete="deleteTag(index)"
          />
        </div>

        <input
          v-model.trim="tag"
          type="text"
          name="tags"
          @keyup="createTag"
          placeholder="Tags like card, button, etc"
        />

        <Button class="rounded-md text-white mb-0" :loading="uploading"
          >Create</Button
        >
      </form>

      <Editor
        v-if="preview.length"
        class="flex-1 basis-80 max-sm:mt-0"
        :show-copy-btn="false"
      >
        <iframe class="w-full h-96" :src="preview" frameborder="0"></iframe>
      </Editor>
    </div>
  </section>
</template>

<style scoped>
input,
textarea {
  @apply border border-slate-800 rounded p-2 bg-transparent;
}
</style>
