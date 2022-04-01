<script setup lang="ts">
import SortAndOrder from './components/SortAndOrder.vue'
import SelectedAssetFolderCard from './components/SelectedAssetFolderCard.vue'
import SearchAssetFolders from './components/SearchAssetFolders.vue'
import { initExtension, isExtension } from './lib'
import { selectedFolder } from './lib/folders'

initExtension()
</script>

<template>
  <div v-if="!isExtension">
    Must be used as a
    <a
      href="https://www.contentstack.com/docs/developers/create-custom-fields/about-custom-fields/"
      target="_blank"
    >
      ContentStack Field Extension
    </a>
  </div>

  <section v-else>
    <SortAndOrder />
    <SelectedAssetFolderCard v-if="selectedFolder.data" />
    <SearchAssetFolders v-else />
  </section>
</template>

<style src="./assets/main.scss" lang="scss"></style>
