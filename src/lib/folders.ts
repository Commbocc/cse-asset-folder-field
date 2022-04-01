import { reactive, watch } from 'vue'
import { stack, state } from '.'

watch(() => state.folderUid, setSelectedFolder)
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
export const selectedFolder = reactive<IReactiveSelectedFolder>({
  loading: false,
  data: undefined,
})

/**
 *
 */
async function setSelectedFolder() {
  selectedFolder.loading = true
  try {
    selectedFolder.data = state.folderUid
      ? await findAssetFolder(state.folderUid)
      : undefined

    // fetch children
    fetchSelectedFolderChildren()
  } catch (error) {
    //
  } finally {
    selectedFolder.loading = false
  }
}

/**
 * selected folder children
 */
export const selectedFolderChildren = reactive<IReactiveSelectFolderChildren>({
  loading: false,
  data: [],
})

/**
 *
 */
export async function fetchSelectedFolderChildren() {
  selectedFolderChildren.loading = true
  try {
    let query = stack.value.Asset.Query().where('parent_uid', state.folderUid)
    // sorting
    query = state.sortAscending
      ? query.ascending(state.sortBy)
      : query.descending(state.sortBy)
    // find
    const { assets } = await query.find()
    // set
    selectedFolderChildren.data = assets
  } catch (error) {
    console.warn(error)
  } finally {
    selectedFolderChildren.loading = false
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
