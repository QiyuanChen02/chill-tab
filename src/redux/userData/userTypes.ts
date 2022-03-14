export interface ProjectInfo {
    id: string
    name: string
    image: string | null
}

export interface UserData {
    email: string
    projects: ProjectInfo[]
    selectedProject: string | null
    settings: {
        mode: "light" | "dark"
    }
}

export interface UserDataState {
    data: UserData
    uid: string | null
    loadingUser: boolean
    loadingData: boolean
    error: string | undefined
}
