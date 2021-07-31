export type Workspace = 'client' | 'talent' | 'admin'

export interface iWorkspace {
  name: Workspace,
  views: iView[]
}

export interface iView {
  route: string,
  icon: string,
  display: string,
  alike?: string,
  queryParams?: any
}
