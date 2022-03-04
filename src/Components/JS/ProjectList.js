import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";

export default function ProjectList() {
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(null)
    useEffect(() => {

        const fetchProjects = () => {
            fetch('http://127.0.0.1:8000/api/projects')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setProjects(data)
                    setLoading(true)
                })
        }
        fetchProjects()
    }, [])

    const projectData = () => {
        let projectDataArr = []
        for (let i = 0; i < projects.length; i++) {
            projectDataArr.push([
                projects[i].title,
                projects[i].description,
                projects[i].created_on,
                `${projects[i].created_by.first_name} ${projects[i].created_by.last_name}`
            ])
        }
        return projectDataArr
    }
    return (
        <>
            {loading
                ? <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <MUIDataTable
                        columns={['Project name', 'Description', 'Created on', 'Created by', '']}
                        data={loading ? projectData() : []}
                        title={'Projects'}
                        options={
                            {selectableRows: 'none'}
                        }
                    />
                </Container>
                : null
            }
        </>

    )
}