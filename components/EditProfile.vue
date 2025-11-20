<script setup>
import { EditProfileChangePassword, EditProfileEditPhoto, EditProfileLinks } from "#components";
import { ref } from "vue";
import EditProfileBasicDetails from "~/components/EditProfile/BasicDetails.vue"
import { logout } from '~/composable/useAuth';

const modelValue = defineModel({ default: false });

const activeTab = ref("basics");
const tabs = [
    { name: "basics", component: EditProfileBasicDetails },
    { name: "password", component: EditProfileChangePassword },
    { name: "links", component: EditProfileLinks },
];

const currentComponent = computed(() => {
    return tabs.find((tab) => tab.name === activeTab.value)?.component || null;
});

function handleLogout() {
    logout();
}
</script>

<template>
    <section class="fixed z-50 inset-0 grid place-items-center bg-black/40 backdrop-blur-sm"
        :class="{ hidden: !modelValue }">
        <div class="bg-bg border w-[min(900px,90%)] rounded-xl border-slate-800 overflow-hidden">
            <div class="text-lg p-4 border-b border-gray-700 flex items-center justify-between">Settings
                <Icon name="material-symbols:close-rounded" class="cursor-pointer" @click.self="modelValue = false" />
            </div>
            <div class="flex h-[60vh] max-h-[80vh]">
                <div class="w-[25%] border-r border-gray-700 flex flex-col justify-between">
                    <div>
                        <div @click="activeTab = 'basics'"
                            class=" flex items-center gap-2 text-[14px] px-3 py-3 cursor-pointer hover:bg-gray-900">
                            <Icon name="material-symbols:person" class="size-5" style="color: white" /> Basic details
                        </div>
                        <div @click="activeTab = 'links'"
                            class="flex items-center gap-2 text-[14px] px-3 py-3 cursor-pointer hover:bg-gray-900">
                            <Icon name="ri:links-fill" class="size-5" style="color: white" /> Links
                        </div>
                    
                        <div @click="activeTab = 'password'"
                            class="flex items-center gap-2 text-[14px] px-3 py-3 cursor-pointer hover:bg-gray-900">
                            <Icon name="ic:sharp-password" class="size-5" style="color: white" /> Change password
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-2 text-[14px] text-red-500 px-3 py-2 cursor-pointer hover:bg-gray-900"
                        @click="handleLogout">
                        <Icon name="mynaui:power-solid" style="color: red" />
                        Logout
                    </div>
                </div>
                <div class="w-[75%] px-4 overflow-y-scroll">
                    <Component :is="currentComponent" />
                </div>
            </div>
        </div>
    </section>
</template>