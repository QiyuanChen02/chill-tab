export type PossibleEmbeds = 'spotify'

export type PossibleSounds = 'rain' | 'birds' | 'thunder' | 'volcano' | 'wind' | 'beach'

export interface Sound {
    id: string
    position: [number, number]
    dimensions: [number, number]
    metadata: {
        component: 'sound'
        type: PossibleSounds
    }
    styles: {
        colour: string
    }
}

export interface Embed {
    id: string
    position: [number, number]
    dimensions: [number, number]
    metadata: {
        component: 'embed'
        type: PossibleEmbeds
    }
    styles: {
        colour: null
    }
}

export type Item = Sound | Embed

export interface ProjectData {
    name: string
    createdBy: null
    size: [number, number]
    items: Item[]
}

export interface ProjectDataState {
    projectId: string | null
    loadingProjectData: boolean
    error: null | string
    data: ProjectData
}

export interface Move {
    id: string
    newPosition: [number, number]
}

export interface Resize {
    id: string
    newPosition: [number, number]
    newDimensions: [number, number]
}
