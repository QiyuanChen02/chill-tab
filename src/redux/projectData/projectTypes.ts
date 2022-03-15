export type PossibleTracks =
    | 'rain'
    | 'birds'
    | 'thunder'
    | 'volcano'
    | 'wind'
    | 'beach'

export interface Sound {
    id: string
    metadata: {
        type: PossibleTracks
    }
    styles: {
        colour: string
        position: [number, number]
        dimensions: [number, number]
    }
}

export interface Embed {
    id: string
    metadata: {
        type: string
    }
    styles: {
        colour: null
        position: [number, number]
        dimensions: [number, number]
    }
}

export interface ProjectData {
    name: string
    createdBy: null
    size: [number, number]
    sounds: Sound[]
    embeds: Embed[]
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

