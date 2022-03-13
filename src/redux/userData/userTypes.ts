export interface ProjectInfo {
    id: string
    name: string
    image: string | null
}

export interface DataState {
    email: string
    projects: ProjectInfo[]
    selectedProject: string | null
}

export interface UserDataState {
    data: DataState
    uid: string | null
    loadingUser: boolean
    loadingData: boolean
    error: string | undefined
}
