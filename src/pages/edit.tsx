import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProjectEdit from '../components/projectEdit'
import ProjectData from '../redux/projectData/projectData'

const Edit = () => {
    const params = useParams()

    useEffect(() => {
        console.log(params)
    }, [])
    return (
        <div className="index">
            <h1>EDIT PAGE:</h1>
            <ProjectEdit />
        </div>
    )
}

export default Edit
