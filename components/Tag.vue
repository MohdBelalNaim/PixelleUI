<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>

<template>
  <div
    class="flex items-center gap-2 border border-slate-600 bg-slate-800 capitalize text-blue-500 text-sm py-0.5 px-2 rounded-full"
  >
    #{{ tag }}
    <img
      @click="$emit('delete')"
      class="w-3.5 invert cursor-pointer"
      src="/icons/close-transition.svg"
      alt="x"
    />
  </div>
</template>
