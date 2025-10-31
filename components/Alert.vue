<script setup lang="ts">
import { alert } from "~/composable/useAlert";
</script>

<template>
  <section
    v-if="alert.message.length"
    class="flex gap-2 items-start fixed top-24 backdrop-blur-md right-6 py-2.5 px-3 font-medium border rounded-md max-w-80 w-full"
    :class="{
      'border-green-800/60 bg-green-800/50 text-green-600':
        alert.type == 'success',
      'border-red-700/60 bg-red-700/50 text-red-600': alert.type == 'error',
    }"
  >
    <img
      v-if="alert.type == 'success'"
      src="/icons/circle-check.svg"
      class="w-5 mt-1"
      alt="success"
    />
    <img v-else src="/icons/circle-error.svg" class="w-5 mt-1" alt="error" />
    <div>
      {{ alert.message }}
    </div>
  </section>
</template>

<style scoped>
section {
  transition: 150ms linear;
  transform: translateX(350px);
  animation: slide 0.15s forwards;
  z-index: 99999;
}

@keyframes slide {
  to {
    transform: translateX(0);
  }
}
</style>
