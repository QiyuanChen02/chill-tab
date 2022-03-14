import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProjectEdit from '../components/projectEdit'
import { useProjectDataChange } from '../hooks/projectDataChange'

const Edit = () => {

    const { projectId } = useParams();

    return (
        <div className="index">
            <Typography>{projectId}</Typography>
            <ProjectEdit />
        </div>
    )
}

export default Edit
