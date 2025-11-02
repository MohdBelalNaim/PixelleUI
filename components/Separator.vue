<script setup lang="ts">
const { lineColor = "bg-gray-300" } = defineProps<{
  lineColor?: string;
  textColor?: string;
}>();
</script>

<template>
  <div class="flex items-center gap-4 py-1">
    <span class="flex-1 h-px" :class="lineColor"></span>
    <span :class="textColor">
      <slot>Continue with</slot>
    </span>
    <span class="flex-1 h-px" :class="lineColor"></span>
  </div>
</template>
