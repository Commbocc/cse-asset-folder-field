import { reactive, ref, watch } from 'vue'
import { stack, state } from '.'

watch(() => state.uid, setSelectedFolder)
watch(() => [state.sortBy, state.sortAscending], fetchSelectedFolderChildren)

/**
 *
 */
export const folders = reactive<IReactiveFolders>({
  loading: false,
  data: [],
})

/**
 *
 */
export async function fetchFolders() {
  if (!state.searchTerm || !(state.searchTerm.length > 2))
    return (folders.data = [])

  folders.loading = true

  try {
    const { assets } = await stack.value.Asset.Query()
      .addParam('include_folders', 'true')
      .search(state.searchTerm)
      .where('content_type', 'application/vnd.contenstack.folder')
      .find()

    folders.data = assets
  } catch (error) {
    console.warn(error)
  } finally {
    folders.loading = false
  }
}

/**
 *
 * @param uid
 */
async function findAssetFolder(
  uid: IAssetFolder['uid']
): Promise<IAssetFolder> {
  const { assets } = await stack.value.Asset.Query()
    .addParam('include_folders', 'true')
    .where('uid', uid)
    .findOne()

  return assets[0] as IAssetFolder
}

/**
 *
 */
export const selectedFolderLoading = ref<boolean>(false)

/**
 *
 */
async function setSelectedFolder() {
  selectedFolderLoading.value = true
  try {
    state.data = state.uid ? await findAssetFolder(state.uid) : undefined

    // fetch children
    fetchSelectedFolderChildren()
  } catch (error) {
    //
  } finally {
    selectedFolderLoading.value = false
  }
}

/**
 * selected folder children
 */
export const selectedFolderChildrenLoading = ref<boolean>(false)

/**
 *
 */
export async function fetchSelectedFolderChildren() {
  selectedFolderChildrenLoading.value = true
  try {
    let query = stack.value.Asset.Query().where('parent_uid', state.uid)
    // sorting
    query = state.sortAscending
      ? query.ascending(state.sortBy)
      : query.descending(state.sortBy)
    // find
    const { assets } = await query.find()
    // set
    state.children = assets
  } catch (error) {
    console.warn(error)
  } finally {
    selectedFolderChildrenLoading.value = false
  }
}

/**
 *
 */
export enum ESortBy {
  'filename' = 'Filename',
  'title' = 'Title',
  'created_at' = 'Created Date',
  'updated_at' = 'Updated Date',
  'content_type' = 'Kind',
}
