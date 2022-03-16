import { nanoid } from 'nanoid'
import { ProjectData } from '../redux/projectData/projectTypes'

export const getNewProject = (): ProjectData => {
    return {
        name: 'Untitled',
        createdBy: null,
        size: [800, 500],
        items: [
            {
                id: nanoid(),
                position: [100, 100],
                dimensions: [100, 100],
                metadata: {
                    component: 'sound',
                    type: 'rain',
                },
                styles: {
                    colour: '#FF0000',
                },
            },
            {
                id: nanoid(),
                position: [500, 100],
                dimensions: [200, 200],
                metadata: {
                    component: 'sound',
                    type: 'volcano',
                },
                styles: {
                    colour: '#FFFF00',
                },
            },
            {
                id: nanoid(),
                position: [100, 300],
                dimensions: [200, 100],
                metadata: {
                    component: 'embed',
                    type: 'spotify',
                },

                styles: {
                    colour: null,
                },
            },
        ],
    }
}
