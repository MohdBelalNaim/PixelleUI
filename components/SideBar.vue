<script setup lang="ts">
import { API_URL } from "~/composable/useURLs";
import { useProjects } from "~/store/projects.store";
const projects = useProjects();
onMounted(() => {
  fetch(API_URL + "projects/")
    .then((res) => res.json())
    .then((result) => {
      projects.value = result.success;
    });
});
</script>

<template>
  <aside class="p-4">
    <div class="flex gap-4 mb-8">
      <Logo />
    </div>
    <section class="grid gap-4 max-h-screen overflow-y-auto">
      <h3 class="sub-heading text-primary">Get Started</h3>
      <NuxtLink class="capitalize" to="/components">Usage</NuxtLink>
      <h3 class="sub-heading text-primary">Components</h3>
      <NuxtLink v-for="project in projects" :to="'/components/' + project.id">{{
        project.name
      }}</NuxtLink>
    </section>
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  flex-flow: column;
  position: fixed;
  left: 0;
  transform: translateX(-100%);
  height: 100dvh;
  width: 300px;
  background-color: inherit;
  transition: 0.25s ease;
  border-right: 1px solid var(--border);
}

@media screen and (min-width: 768px) {
  aside {
    transform: translateX(0);
  }
}

.sub-heading {
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

a {
  text-transform: capitalize;
  color: rgb(156 163 175);
}

.router-link-exact-active {
  color: white;
}
</style>
