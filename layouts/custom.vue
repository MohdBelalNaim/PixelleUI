<script setup lang="ts">
import { useTitle } from "~/composable/useTitle";
import { toggleSidebar } from "~/composable/useToggleSidebar";

const title = useTitle();

toggleSidebar("sidebar");
</script>

<template>
  <section>
    <SideBar />
    <main>
      <div
        class="flex sticky top-0 bg-bg border-b border-slate-800 z-50 items-center justify-between p-4 font-medium text-primary text-xl capitalize"
      >
        <div class="font-bold text-2xl">{{ title }}</div>

        <div class="flex gap-4">
          <UserButton class="max-md:hidden" />
          <label class="md:hidden group cursor-pointer flex">
            <img
              src="/icons/menu.svg"
              class="invert group-has-[input:checked]:hidden"
            />
            <img
              src="/icons/close-transition.svg"
              class="invert hidden group-has-[input:checked]:block"
            />
            <input type="checkbox" id="sidebar" class="hidden" />
          </label>
        </div>
      </div>
      <slot></slot>
    </main>
  </section>
</template>

<style lang="css">
body:has(#sidebar:checked) aside {
  background-color: var(--background);
  transform: translateX(0);
  z-index: 99;
}

main {
  @apply md:ml-[300px];
  min-height: 100dvh;
  display: grid;
  grid-template-rows: max-content auto;
  transition: 0.25s ease;
}
</style>
