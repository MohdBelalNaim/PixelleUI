<template>
    <ul class="tabs">
        <!-- <li v-for="tab in getTabs" :key="tab.editorId" class="flex items-center gap-2"
            :class="{ 'active': getActiveTab == tab.filename }" @click.stop="fileStore.setActiveTab(tab.filename)">
            <IconFile :icon="LanguagesIcon[tab.lang]" :name="tab.filename" />
            <div v-if="tab.lang == 'html'" @click.stop="hardReload">
                <Icon icon="material-symbols:refresh-rounded" class="hover:text-blue-400" />
            </div>
            <div @click.stop="fileStore.closeTab(tab)">
                <Icon icon="material-symbols:close-rounded" class="hover:text-red-500" />
            </div>
        </li> -->
    </ul>
</template>

<script setup lang="ts">

</script>

<style scoped>
.tabs {
    display: flex;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    li {
        flex: 0 0 170px;
        padding: 8px 12px;
        font-size: 13px;
        cursor: pointer;

        &:hover {
            background-color: #1f1f1f;
        }

        &.active {
            background-color: #1f1f1f;
            border-top: 1px solid dodgerblue;
        }
    }
}
</style>