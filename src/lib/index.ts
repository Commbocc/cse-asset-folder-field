import CS from '@contentstack/ui-extensions-sdk'
import { computed, reactive, ref, watch } from 'vue'

let extension: IContentStackUIExtension
export const isExtension = ref(false)

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
  uid: '',
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
    const { api_key } = extension.stack._data
    Object.assign(extensionSettings, { api_key, ...extension.config })

    // set field data
    const fieldData: Object = field.value.getData()
    if (Object.keys(fieldData).length !== 0) Object.assign(state, fieldData)

    isExtension.value = true
  } catch (error) {
    isExtension.value = false
    console.warn(`Unable to load ContentStack extension.`)
  }
}
