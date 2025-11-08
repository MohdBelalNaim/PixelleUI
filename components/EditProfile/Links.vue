<script setup>
import { updateLinks } from '~/composable/useUpdate';
import { useUser } from '~/composable/useUser';
const user = useUser()

const links = JSON.parse(user?.value?.links)
</script>
<template>
    <form @submit.prevent="updateLinks">
        <div class="text-lg py-2 font-medium">Add your social links</div>
        <div class="mb-4">
            <label for="" class="text-sm">Instagarm</label>
            <input type="text" class="w-full" name="instagram" :value="links?.instagram">
        </div>
        <div class="mb-4">
            <label for="" class="text-sm">Twitter</label>
            <input type="text" class="w-full" name="twitter" :value="links?.twitter">
        </div>
        <div class="mb-4">
            <label for="" class="text-sm">Linkedin</label>
            <input type="text" class="w-full" name="linkedin" :value="links?.linkedin">
        </div>
        <div class="mb-4">
            <label for="" class="text-sm">Other</label>
            <input type="text" class="w-full" name="other" :value="links?.other ">
        </div>
        <button class="text-sm bg-primary px-4 py-2 rounded mb-5"> Update </button>
    </form>
</template>