export interface ProjectInfo {
    id: string
    name: string
    image: string | null
}

export interface UserData {
    email: string | null
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
    loadingUserData: boolean
    error: string | undefined
}
