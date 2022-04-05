<script setup lang="ts">
import { state } from '../lib'
import { ESortBy, fetchFolders, folders } from '../lib/folders'
import { debounce } from '../lib/util'

const search = debounce(fetchFolders, 500)
</script>

<template>
  <div class="mb-3">
    <label for="searchTerm" class="form-label">Search</label>
    <input
      v-model="state.searchTerm"
      @keyup="search"
      type="text"
      class="form-control form-control-lg"
      id="searchTerm"
      placeholder="Search Asset Folders"
    />
  </div>

  <div v-if="folders.loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="folders.data?.length" class="list-group">
    <a
      v-for="folder in folders.data"
      :key="folder.uid"
      @click.prevent="state.uid = folder.uid"
      href="#"
      class="
        list-group-item list-group-item-action
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <span>
        {{ folder.name }}
      </span>
    </a>
  </div>

  <div v-else-if="state.searchTerm.length">No Results</div>

  <!-- <pre>{{ folders }}</pre> -->
</template>
