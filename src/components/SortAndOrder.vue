<script setup lang="ts">
import { state } from '../lib'
import { ESortBy } from '../lib/folders'
</script>

<template>
  <div class="mb-3">
    <label for="sortBy" class="form-label">Sort By</label>
    <select v-model="state.sortBy" id="sortBy" class="form-control">
      <option v-for="(key, value) of ESortBy" :value="value">{{ key }}</option>
    </select>
  </div>

  <div class="mb-3">
    <label class="form-label">Sort Order</label>
    <div>
      <div class="form-check form-check-inline">
        <input
          v-model="state.sortAscending"
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="ascending"
          :value="true"
        />
        <label class="form-check-label" for="ascending">Ascending</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          v-model="state.sortAscending"
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="descending"
          :value="false"
        />
        <label class="form-check-label" for="descending">Descending</label>
      </div>
    </div>
  </div>
</template>
