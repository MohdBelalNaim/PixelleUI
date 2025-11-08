<script setup lang="ts">
const text = ref<HTMLElement>();
const { showCopyBtn = true } = defineProps<{
  showCopyBtn?: boolean;
}>();
</script>

<template>
  <div class="bg-slate-900 rounded-md my-8 max-w-3xl">
    <section
      class="flex justify-between items-center py-2 px-4 border-b border-slate-800"
    >
      <ul class="flex gap-2">
        <li class="bg-red-400"></li>
        <li class="bg-yellow-400"></li>
        <li class="bg-green-400"></li>
      </ul>

      <slot name="title">index.html</slot>
    </section>
    <div class="code_container p-4 overflow-auto relative">
      <span ref="text" class="[&>pre]:text-pretty">
        <slot></slot>
      </span>
      <CopyButton
        v-if="showCopyBtn"
        class="bottom-2.5 top-auto right-2.5"
        :text="$refs.text?.textContent || ''"
      />
    </div>
  </div>
</template>

<style scoped>
li {
  @apply size-2.5 rounded-full;
}
</style>
