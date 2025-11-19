<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "./composable/useAuth";

const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  let [resource, options] = args;
  let user = localStorage.getItem("user");

  if (user && (resource as URL).toString().includes("pixelle")) {
    options = {
      ...options,
      headers: {
        user: user,
      },
    };
  }
  const response = await originalFetch(resource, options);
  return response;
};

onMounted(useAuth);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Alert />
  </NuxtLayout>
</template>
