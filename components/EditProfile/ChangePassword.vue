<script setup lang="ts">
import { updatePassword } from "~/composable/useUpdate"
</script>
<template>
    <form @submit.prevent="updatePassword">
        <div class="text-lg py-2 font-medium">Change password</div>
        <label for="" class="text-sm">Enter new password</label>
        <input type="password" class="w-full" name="password" require>
        <button class="text-sm bg-primary px-4 py-2 rounded mt-2"> Update </button>
    </form>
</template>