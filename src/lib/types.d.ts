interface IAsset {
  uid: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
  content_type: string
  tags: string[]
  is_dir: boolean
  parent_uid: string
}

interface IAssetFolder extends IAsset {
  name: string
}

interface IAssetFile extends IAsset {
  filename: string
  title: string
  description: string
  url: string
}

interface IReactiveState {
  searchTerm: string
  sortBy: keyof typeof import('./folders').ESortBy
  sortAscending: boolean
  folderUid: IAssetFolder['uid']
}

interface IReactiveFolders {
  loading: boolean
  data: IAssetFolder[]
}

interface IReactiveSelectedFolder {
  loading: boolean
  data?: IAssetFolder
}

interface IReactiveSelectFolderChildren {
  loading: boolean
  data: IAssetFile[]
}
