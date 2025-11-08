<script setup lang="ts">
import logo from "~/public/logo.svg";
const { hideLogo = false } = defineProps<{
  hideLogo?: boolean;
}>();
</script>

<template>
  <NuxtLink to="/">
    <div class="flex gap-4">
      <img :src="logo" alt="logo" :class="{ 'max-sm:hidden': hideLogo }" />
      <span class="font-bold text-2xl text-secondary">Pixelle</span>
    </div>
  </NuxtLink>
</template>
