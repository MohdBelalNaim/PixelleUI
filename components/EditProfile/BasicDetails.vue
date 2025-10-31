<script setup>
import { updateBasicDetails } from '~/composable/useUpdate';
import { useUser } from '~/composable/useUser';
const user = useUser()

</script>
<template>
    <form @submit.prevent="updateBasicDetails">
        <div class="text-lg py-2 font-medium">Basic details</div>
        <div class="mb-4">
            <label for="" class="text-sm">Full name</label>
            <input :value="user?.name" type="text" class="w-full" name="name" required>
        </div>
        <div class="mb-4">
            <label for="" class="text-sm">City</label>
            <input :value="user?.city" type="text" class="w-full" name="city">
        </div>
        <div class="mb-4">
            <label for="" class="text-sm">State</label>
            <input :value="user?.state" type="text" class="w-full" name="state">
        </div>
        <div class="mb-4">
            <label for="" class="text-sm">Bio</label>
            <textarea :value="user?.bio" type="text" class="w-full" name="bio"></textarea>
        </div>
        <button class="text-sm bg-primary px-4 py-2 rounded mb-5"> Update </button>
    </form>
</template>