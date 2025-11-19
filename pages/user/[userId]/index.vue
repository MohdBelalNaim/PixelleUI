<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
import { useUser } from "~/composable/useUser";
import { createNewProject } from "~/store/create.store";
import UploadFile from "~/components/UploadFile.vue";
import { EditProfile } from "#components";
const user = useUser();
const menu = ref(false);
const upload = ref(false);
const showUploadFile = ref(false);
const edit = ref(false)

const links = computed(() => {
  return JSON.parse(user?.value?.links ?? '{}');
})

</script>

<template>
  <EditProfile v-model="edit" />
  <NavBar />
  <UploadFile v-model="showUploadFile" />
  <div class="max-width">
    <div
      class="bg-[url('https://img.freepik.com/free-vector/linear-flat-abstract-lines-pattern_23-2148939520.jpg')] bg-contain h-[220px] max-sm:h-[180px] flex justify-center items-end relative">
      <img v-if="user?.picture" :src="user.picture" class="rounded-full absolute bottom-[-60px] size-[140px]" alt="" />
      <img v-else src="/public/images/avatar.webp" class="rounded-full absolute bottom-[-60px] size-[140px]" alt="" />
    </div>
    <div class="bg-gray-900 flex-col flex items-center gap-y-2 p-6">
      <div class="text-xl font-medium mt-[54px]">{{ user?.name }}</div>
      <div v-if="user?.city && user?.state" class="text-sm text-gray-300">{{ user?.city }}, {{ user?.state }}</div>
      <div v-if="user?.bio" class="w-[50%] max-sm:w-[100%] max-sm:text-justify text-center text-sm">
        {{ user?.bio }}
      </div>
      <div class="flex mt-4 gap-3">
        <div v-for="(url, platform) in links">
          <a class="mr-2" v-if="['linkedin', 'instagram', 'twitter'].includes(String(platform)) && url != ''"
            :href="url">
            <img :src="'/icons/' + platform + '.svg'" class="invert" alt="link" />
          </a>
          <a class="mr-2" v-else-if="String(platform) === 'other' && url != ''" :href="url" target="_blank">
            <img :src="'/icons/link.svg'" class="size-8 rounded-full bg-white p-1.5" alt="" />
          </a>
        </div>

      </div>
    </div>
    <div class="bg-gray-900 border-t border-gray-500 flex justify-between px-8 items-center max-sm:p-4 relative">
      <div v-if="menu" class="absolute bg-gray-700 text-sm w-[40%] top-[55px] left-0 rounded shadow">
        <div class="px-4 py-3 border-b">20 Components</div>
      </div>
      <div class="bg-white rounded-full p-1 hidden max-sm:block" @click="menu = !menu">
        <img v-if="!menu" src="/icons/dots.svg" class="size-5" alt="open-menu" />
        <img v-else src="/icons/close-transition.svg" class="size-5" alt="close-menu" />
      </div>
      <div class="flex max-sm:hidden">
        <div class="text-center px-4 py-3 border-b-2 border-blue-400">
          <div class="font-medium">20</div>
          <div class="text-sm">Components</div>
        </div>

      </div>

      <div class="gap-2 flex">
        <img @click="edit = true" src="/public/icons/settings.svg"
          class="invert hover:rotate-45 transition cursor-pointer" alt="" />
        <button @click="upload = !upload"
          class="text-sm px-3 py-1.5 rounded-full border flex items-center hover:bg-blue-700 hover:border-blue-700">
          Create
          <img src="/public/icons/add.svg" class="invert size-5" alt="add" />
        </button>
        <div v-if="upload" class="bg-gray-800 absolute rounded overflow-hidden right-5 top-14 text-sm shadow w-[180px]">
          <div @click="showUploadFile = true"
            class="hover:bg-gray-500 cursor-pointer px-3 py-2 border-b border-gray-600">
            Upload existing
          </div>
          <div @click="createNewProject" class="hover:bg-gray-500 cursor-pointer px-3 py-2">
            Create new
          </div>
        </div>
        <!-- <div v-if="user != null" class="flex gap-4 ml-auto">
          <Button @click="createNewProject">Create</Button>
          <Button @click="showUploadFile = true">Upload Files</Button>
          <Button @click="logout"> Logout </Button>
        </div> -->
      </div>
    </div>

    <div class="text-xl mt-4 font-bold">My components</div>
    <div class="grid gap-4 mt-4 grid-cols-4 max-sm:grid-cols-2">
      <div>
        <div class="h-[180px] bg-gray-200 rounded"></div>
        <div class="flex justify-between text-sm mt-2">
          <div>belalnaim9</div>
          <div class="text-gray-400">228 views</div>
        </div>
      </div>
      <div>
        <div class="h-[180px] bg-gray-200 rounded"></div>
        <div class="flex justify-between text-sm mt-2">
          <div>belalnaim9</div>
          <div class="text-gray-400">228 views</div>
        </div>
      </div>
      <div>
        <div class="h-[180px] bg-gray-200 rounded"></div>
        <div class="flex justify-between text-sm mt-2">
          <div>belalnaim9</div>
          <div class="text-gray-400">228 views</div>
        </div>
      </div>
      <div>
        <div class="h-[180px] bg-gray-200 rounded"></div>
        <div class="flex justify-between text-sm mt-2">
          <div>belalnaim9</div>
          <div class="text-gray-400">228 views</div>
        </div>
      </div>
      <div>
        <div class="h-[180px] bg-gray-200 rounded"></div>
        <div class="flex justify-between text-sm mt-2">
          <div>belalnaim9</div>
          <div class="text-gray-400">228 views</div>
        </div>
      </div>
    </div>
  </div>
</template>
