import { nanoid } from 'nanoid'
import { ProjectData } from '../redux/projectData/projectTypes'

export const getNewProject = (): ProjectData => {
    return {
        name: 'Untitled',
        createdBy: null,
        size: [800, 500],
        sounds: [
            {
                id: nanoid(),
                metadata: {
                    type: 'rain',
                },
                styles: {
                    position: [100, 100],
                    dimensions: [100, 100],
                    colour: '#FF0000',
                },
            },
            {
                id: nanoid(),
                metadata: {
                    type: 'volcano',
                },
                styles: {
                    position: [500, 100],
                    dimensions: [200, 200],
                    colour: '#FFFF00',
                },
            },
        ],
        embeds: [
            {
                id: nanoid(),
                metadata: {
                    type: 'spotify',
                },

                styles: {
                    position: [500, 400],
                    dimensions: [200, 100],
                    colour: null,
                },
            },
        ],
    }
}


