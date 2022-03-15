import { toJpeg } from 'html-to-image'
import React, { useRef } from 'react'
import { Children } from '../defaultThemeProvider'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { saveProjectData } from '../redux/projectData/projectData'
import { changeProjectFromUser } from '../redux/userData/userData'

const PreviewImage: React.FC<Children> = ({ children }) => {
    const dispatch = useAppDispatch()

    const uid = useAppSelector(state => state.userData.uid)
    const project = useAppSelector(state => state.projectData)

    const ref = useRef<HTMLDivElement>(null);
    return (
        <div ref={ref} style={{ padding: '1px' }}>{children}</div>
    )
}

export default PreviewImage