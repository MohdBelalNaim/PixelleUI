<script setup lang="ts">
defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <button
    :disabled="loading"
    class="bg-[#4845d2] px-4 py-1.5 rounded-md transition-all disabled:cursor-not-allowed disabled:bg-gray-800 grid place-items-center hover:brightness-90 active:scale-[.97]"
  >
    <icon
      v-if="loading"
      name="svg-spinners:dot-revolve"
      class="absolute text-xl"
    />
    <span class="flex items-center gap-1" :class="{ invisible: loading }">
      <slot></slot>
    </span>
  </button>
</template>
