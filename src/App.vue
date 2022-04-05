<script setup lang="ts">
import SortAndOrder from './components/SortAndOrder.vue'
import SelectedAssetFolderCard from './components/SelectedAssetFolderCard.vue'
import SearchAssetFolders from './components/SearchAssetFolders.vue'
import { initExtension, isExtension, state } from './lib'

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
    <SelectedAssetFolderCard v-if="state.data" />
    <SearchAssetFolders v-else />
  </section>
</template>
