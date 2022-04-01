<script setup lang="ts">
import SortAndOrder from './components/SortAndOrder.vue'
import SelectedAssetFolderCard from './components/SelectedAssetFolderCard.vue'
import SearchAssetFolders from './components/SearchAssetFolders.vue'
import { initExtension } from './lib'
import { selectedFolder } from './lib/folders'

initExtension()
</script>

<template>
  <SortAndOrder />
  <SelectedAssetFolderCard v-if="selectedFolder.data" />
  <SearchAssetFolders v-else />
</template>

<style src="./assets/main.scss" lang="scss"></style>
