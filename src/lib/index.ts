import CS from '@contentstack/ui-extensions-sdk'
import { computed, reactive, watch } from 'vue'

let extension: any

export const extensionSettings = reactive({})
export const stack = computed(() => extension?.stack)
export const field = computed(() => extension?.field)

/**
 * app state
 */
export const state = reactive<IReactiveState>({
  searchTerm: '',
  sortBy: 'filename',
  sortAscending: true,
  folderUid: '',
})

watch(
  () => state,
  () => field.value.setData(state),
  { deep: true }
)

/**
 * initialize contentstack context
 */
export async function initExtension() {
  try {
    extension = await CS.init()
    extension.window.enableAutoResizing()

    // assign settings
    Object.assign(extensionSettings, extension.config)
    // const { api_key } = stack.value._data

    const fieldData: Object = field.value.getData()
    if (Object.keys(fieldData).length !== 0) Object.assign(state, fieldData)
  } catch (error) {
    console.warn(`Unable to load ContentStack extension.`)
  }
}