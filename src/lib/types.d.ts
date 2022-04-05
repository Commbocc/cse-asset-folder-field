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
  uid: IAssetFolder['uid']
  data?: IAssetFolder
  children?: IAssetFile[]
}

interface IReactiveFolders {
  loading: boolean
  data: IAssetFolder[]
}

/**
 * type ContentStackUIExtension
 * @todo stack
 */
interface IContentStackUIExtension {
  config: Object
  currentUser: Object
  type: string
  fieldConfig: Object
  field: {
    uid: string
    data_type: string
    schema: Object
    setData: (data: Object | string | number) => Promise<void>
    getData: (options?: { resolved?: boolean }) => Object | string | number
    setFocus: () => Object
    onChange: (callback: Function) => any
  }
  store: {
    get: (key: string) => Promise<any>
    getAll: () => Promise<any>
    set: (key: string, value: any) => Promise<any>
    remove: (key: string) => Promise<any>
    clear: () => Promise<any>
  }
  entry: {
    content_type: Object
    locale: string
    getData: () => Object
    getField: (uid: string) => Object
    onSave: (callback: Function) => any
    onChange: (callback: Function) => any
    onPublish: (callback: Function) => any
    onUnPublish: (callback: Function) => any
  }
  window: IContentStackUIExtensionWindow
  stack: any
}

interface IContentStackUIExtensionWindow {
  enableResizing: () => Promise<void>
  onDashboardResize: (callback: Function) => boolean
  updateHeight: (height: string | number) => Promise<void>
  enableAutoResizing: () => IContentStackUIExtensionWindow
  disableAutoResizing: () => IContentStackUIExtensionWindow
}
