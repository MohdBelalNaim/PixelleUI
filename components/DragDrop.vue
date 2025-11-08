<script setup lang="ts">
import { useDropZone } from "@vueuse/core";
import { ref } from "vue";

const emit = defineEmits(["drop"]);

interface IFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

const filesData = ref<IFile[]>([]);

function onDrop(files: File[] | null) {
  filesData.value = [];
  if (files) {
    filesData.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
    emit("drop", files);
  }
}

function fileSelected(event: Event) {
  filesData.value = [];
  const files = (event.target as HTMLInputElement).files;
  filesData.value = files as any;
  emit("drop", files);
}

const dropZoneRef = ref<HTMLElement>();

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<template>
  <label
    for="filePicker"
    ref="dropZoneRef"
    class="grid place-items-center text-2xl cursor-pointer border border-dashed min-h-40 rounded"
    :class="{
      'border-blue-600 bg-blue-950': isOverDropZone,
      'border-slate-500 bg-gray-400/10': !isOverDropZone,
    }"
  >
    <div v-if="filesData.length">{{ filesData.length }} Files</div>
    <div class="text-gray-500 font-medium" v-else>Drop here to upload</div>
  </label>
  <input
    id="filePicker"
    class="hidden"
    type="file"
    name="files[]"
    accept=".htm,.html,.css,.js"
    multiple
    @input="fileSelected"
  />
</template>
