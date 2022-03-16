import { nanoid } from 'nanoid'
import { PossibleSounds, Sound } from '../redux/projectData/projectTypes'

export const newSound = (soundType: PossibleSounds): Sound => {
    return {
        id: nanoid(),
        position: [0, 0],
        dimensions: [100, 100],
        metadata: {
            component: 'sound',
            type: soundType,
        },
        styles: {
            colour: '#FF0000',
        },
    }
}
