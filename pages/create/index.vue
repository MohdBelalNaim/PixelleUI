<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
onMounted(() => {
  setTimeout(() => {
    useRouter().replace(`/create/${uuidv4()}?new=true`);
  }, 2000);
});
</script>

<template>
  <section class="min-h-dvh grid place-items-center place-content-center">
    <img
      src="/icons/workspace.png"
      class="max-w-64 mb-8"
      alt="workspace image"
    />
    <p class="text-3xl font-bold text-center text-primary animate-pulse">
      Creating workspace for you to work...
    </p>
  </section>
</template>
