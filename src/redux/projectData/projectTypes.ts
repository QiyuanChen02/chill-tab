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

export interface ProjectDataState {
    projectId: string | null
    loadingData: boolean
    error: null | string
    data: {
        name: string
        createdBy: null
        size: [number, number]
        sounds: Sound[]
        embeds: Embed[]
    }
}
