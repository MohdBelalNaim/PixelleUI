<script setup lang="ts">
import { useUser } from "~/composable/useUser";
const user = useUser();
</script>

<template>
  <nav class="p-4 sm:py-6 max-w-7xl mx-auto flex items-center justify-between">
    <Logo hideLogo />

    <div class="links flex-1">
      <Logo hideLogo />
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/components">Components</NuxtLink>
      <NuxtLink to="/create">Create component</NuxtLink>

      <div class="actions flex items-center gap-4">
        <NuxtLink to="/auth" v-if="!user">
          <button
            class="bg-primary w-full text-gray-100 px-4 py-1.5 rounded-md"
          >
            Sign In
          </button>
        </NuxtLink>
        <div class="flex items-center gap-4 cursor-pointer" v-else>
          <UserButton />
          <NuxtLink to="/profile" class="md:hidden text-lg">{{ user.name }}</NuxtLink>
        </div>
      </div>
    </div>

    <label class="text-secondary toggleNav flex group cursor-pointer">
      <img
        src="/icons/menu.svg"
        class="invert group-has-[input:checked]:hidden"
      />
      <img
        src="/icons/close-transition.svg"
        class="invert hidden group-has-[input:checked]:block"
      />
      <input type="checkbox" id="links" class="hidden" />
    </label>
  </nav>
</template>

<style scoped>
@media screen and (width <= 768px) {
  nav:has(#links:checked) .links {
    background-color: var(--background);
    flex-flow: column;
    transform: translateX(0);
    z-index: 99;
  }
}

.links {
  display: flex;
  gap: 32px;
  font-weight: 500;
  overflow: hidden;
  align-items: start;
  flex-flow: column;
  padding: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 280px;
  align-content: start;
  transition: 0.25s ease;
  transform: translateX(-100%);
}

.actions {
  margin-top: auto;
  width: 100%;
}

@media screen and (width > 768px) {
  .links {
    position: relative;
    flex-flow: row;
    height: auto;
    width: auto;
    padding: 0;
    align-items: center;
    transform: translateX(0);

    & > a:first-child {
      display: none;
    }
  }

  a:nth-child(2) {
    margin-left: auto;
  }

  .toggleNav {
    display: none;
  }

  .actions {
    margin-top: 0;
    margin-left: auto;
    width: max-content;
  }
}

a {
  text-transform: capitalize;
  color: rgb(156 163 175);
}

.router-link-exact-active {
  color: white;
}
</style>
