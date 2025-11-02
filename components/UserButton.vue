<script setup lang="ts">
import { useUser } from "~/composable/useUser";
const user = useUser();
</script>

<template>
  <NuxtLink v-if="user" :to="`/user/${user.id}`">
    <img
      v-if="user?.picture"
      :src="user.picture"
      alt="UK"
      class="size-9 rounded-full"
    />
    <button
      v-else
      class="bg-primary uppercase text-gray-100 size-9 rounded-full"
    >
      {{
        user?.name
          ?.split(" ")
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
      }}
    </button>
  </NuxtLink>
</template>
