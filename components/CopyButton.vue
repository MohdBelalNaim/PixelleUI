<script setup lang="ts">
import { copyCode } from "~/composable/useCopy";
const { text } = defineProps<{
  text: string;
}>();

const copied = ref(false);

async function copy() {
  copied.value = await copyCode(text);
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <button
    @click="copy"
    class="absolute top-2 right-2 p-2 rounded opacity-40 hover:opacity-100 active:scale-95"
    :class="{
      'bg-slate-800': !copied,
      'bg-green-800': copied,
    }"
  >
    <img v-if="copied" src="/icons/check.svg" class="invert w-5" />
    <img v-else src="/icons/copy.svg" class="invert w-5" />
  </button>
</template>
