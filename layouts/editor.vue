<script setup lang="ts">
import {
  projectStore,
  isSaving,
  saveFile,
  deleteFile,
  isDeletingFile,
} from "~/store/create.store";

const tag = ref("");
const openModel = ref(false);

function createTag(event: KeyboardEvent) {
  if (event.key == "," || event.key == "Enter") {
    projectStore.value.tags.push(
      event.key == "Enter" ? tag.value : tag.value.slice(0, -1)
    );
    tag.value = "";
  }
}

function deleteTag(index: number) {
  projectStore.value.tags.splice(index, 1);
}
</script>

<template>
  <section>
    <aside class="p-4">
      <div class="flex gap-4 mb-8">
        <Logo />
      </div>
      <section class="flex flex-col gap-4 h-full max-h-screen overflow-y-auto">
        <div class="grid gap-1">
          <label for="" class="text-sm text-primary font-medium"
            >Project name</label
          >
          <input
            type="text"
            v-model="projectStore.title"
            placeholder="Animated button"
          />
        </div>

        <div class="grid gap-1">
          <label for="" class="text-sm text-primary font-medium">Tags</label>
          <div
            v-if="projectStore.tags.length"
            class="flex flex-wrap gap-2 my-2"
          >
            <Tag
              v-for="(tag, index) in projectStore.tags"
              :key="tag"
              :tag
              @delete="deleteTag(index)"
            />
          </div>

          <textarea
            v-model.trim="tag"
            type="text"
            name="tags"
            @keyup="createTag"
            rows="4"
            placeholder="Tags like card, button, etc"
          ></textarea>
        </div>

        <div class="grid gap-1">
          <label for="" class="text-sm text-primary font-medium"
            >Visibility</label
          >
          <div class="flex gap-8 items-center">
            <div class="flex items-center gap-2 group">
              <label
                for="private"
                class="text-gray-400 cursor-pointer hover:text-gray-50 group-has-[input:checked]:text-gray-50"
                >Private</label
              >
              <input
                id="private"
                type="radio"
                name="visibility"
                value="private"
                v-model="projectStore.visibility"
              />
            </div>

            <div class="flex items-center gap-2 group">
              <label
                for="public"
                class="text-gray-400 cursor-pointer hover:text-gray-50 group-has-[input:checked]:text-gray-50"
                >Public</label
              >
              <input
                id="public"
                type="radio"
                name="visibility"
                value="public"
                v-model="projectStore.visibility"
              />
            </div>
          </div>
        </div>

        <div v-if="projectStore.uploaded" class="grid gap-1">
          <label class="text-sm text-primary font-medium">Project link</label>
          <a
            :href="`/components/${projectStore.id}`"
            target="_blank"
            class="text-sm flex items-center gap-2"
          >
            <Icon name="mdi:open-in-new" size="18" />
            <span class="truncate max-w-60"
              >components/{{ projectStore.id }}
            </span>
          </a>
        </div>

        <div class="mt-auto grid grid-cols-2 gap-4">
          <Button class="bg-emerald-600" @click="saveFile" :loading="isSaving"
            ><img src="/icons/save.svg" class="invert w-5" alt="" />
            {{ projectStore.uploaded ? "Update" : "Publish" }}</Button
          >
          <Button @click="openModel = true"
            ><img src="/icons/upload.svg" class="invert w-5" alt="" />
            Upload</Button
          >
          <div v-if="projectStore.uploaded" class="col-span-2">
            <hr />
            <Button
              class="bg-red-500 mt-4 w-full"
              @click="deleteFile"
              :loading="isDeletingFile"
            >
              <Icon name="solar:trash-bin-trash-bold" />
              Delete</Button
            >
          </div>
        </div>
      </section>
    </aside>
    <main>
      <div
        class="flex sticky top-0 bg-bg border-b border-slate-800 z-50 items-center justify-between p-4 font-medium text-primary text-xl capitalize"
      >
        <div class="font-bold text-2xl">
          {{ projectStore.title || "untitled project" }}
        </div>
        <div class="flex gap-4">
          <UserButton class="max-md:hidden" />
          <label class="md:hidden group cursor-pointer flex">
            <img
              src="/icons/menu.svg"
              class="invert group-has-[input:checked]:hidden"
            />
            <img
              src="/icons/close-transition.svg"
              class="invert hidden group-has-[input:checked]:block"
            />
            <input type="checkbox" id="sidebar" class="hidden" />
          </label>
        </div>
      </div>
      <slot></slot>
    </main>
  </section>
  <UploadFile v-model="openModel" />
</template>

<style lang="css">
body:has(#sidebar:checked) aside {
  background-color: var(--background);
  transform: translateX(0);
  z-index: 99;
}

input[type="radio"] {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  outline: 1px solid dodgerblue;
  box-sizing: border-box;
  padding: 0;

  &:checked {
    border: 4px solid var(--background);
    background-color: dodgerblue;
  }
}

aside {
  display: flex;
  flex-flow: column;
  position: fixed;
  left: 0;
  transform: translateX(-100%);
  height: 100dvh;
  width: 300px;
  background-color: inherit;
  transition: 0.25s ease;
  border-right: 1px solid var(--border);
}

@media screen and (min-width: 768px) {
  aside {
    transform: translateX(0);
  }
}

main {
  @apply md:ml-[300px];
  min-height: 100dvh;
  display: grid;
  grid-template-rows: max-content auto;
  transition: 0.25s ease;
}
</style>
