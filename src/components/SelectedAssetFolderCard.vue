<script setup lang="ts">
import { computed } from 'vue'
import { state } from '../lib'
import { selectedFolder, selectedFolderChildren } from '../lib/folders'
const folder = computed(() => selectedFolder.data)
</script>

<template>
  <div v-if="folder" class="card">
    <header class="card-header">
      <div class="d-flex justify-content-between">
        <h5 class="mb-0">{{ folder.name }}</h5>

        <!-- deselect -->
        <button
          @click.prevent="state.folderUid = ''"
          class="btn-close pull-right"
          aria-label="Deselect"
        ></button>
      </div>
      <small class="text-muted">
        Last modified: {{ new Date(folder.updated_at).toLocaleString() }}
      </small>
    </header>

    <div class="card-body">
      <!-- <pre>{{ selectedFolderChildren }}</pre> -->
      <div
        v-if="selectedFolderChildren.loading"
        class="d-flex justify-content-center"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!--  -->
      <div
        v-else-if="selectedFolderChildren.data.length"
        class="list-group list-group-flush"
      >
        <div
          v-for="asset in selectedFolderChildren.data"
          :key="asset.uid"
          class="list-group-item"
        >
          <div class="d-flex mb-1">
            <!-- icon -->
            <div class="flex-shrink-0">
              <svg
                v-if="asset.content_type.includes('image')"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-file-earmark-image text-muted"
                viewBox="0 0 16 16"
              >
                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path
                  d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                />
              </svg>

              <svg
                v-else-if="asset.content_type.includes('pdf')"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-file-earmark-pdf text-muted"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
                />
                <path
                  d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-file-earmark text-muted"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                />
              </svg>
            </div>

            <div class="flex-grow-1 ms-3 text-truncate">
              <header class="d-flex justify-content-between">
                <h6>
                  {{ asset.filename }}
                  <small>
                    <br />
                    {{ asset.title }}
                  </small>
                </h6>
                <!-- asset link -->
                <a :href="asset.url" target="_blank" class="text-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-link-45deg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
                    />
                    <path
                      d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
                    />
                  </svg>
                </a>
              </header>

              <div class="small">
                {{ asset.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  -->
      <div v-else class="">Empty Asset Folder</div>
    </div>
  </div>
</template>
