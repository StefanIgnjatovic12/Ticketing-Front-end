import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import TicketEditForm from "./TicketEditForm";


export default function ProjectList() {
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(null)
    useEffect(() => {

        const fetchProjects = () => {
            fetch('http://127.0.0.1:8000/api/projects')
                .then(response => response.json())
                .then(data => {
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
                `${projects[i].created_by.first_name} ${projects[i].created_by.last_name}`,
                projects[i].id


            ])
        }
        return projectDataArr
    }

    //<Link to="/roles" style={{ textDecoration: 'none' }}>Role Management</Link>
    return (
        <>
            {loading
                ? <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                    <MUIDataTable
                        columns={['Project name', 'Description', 'Created on', 'Created by', {
                            name: "",
                            options: {
                                filter: false,
                                //makes the content of the column into a href
                                customBodyRender: (value) => {
                                    return (
                                        <a href={`http://localhost:3000/projects/${value}`}>View/Modify Project</a>
                                    );
                                }
                            }
                        },]}
                        data={projectData()}
                        title={'Projects'}
                        options={
                            {
                                selectableRows: 'none',
                                print: false,
                                download: false,
                                viewColumns: false
                                //if cell is in column 0, redirect on click
                                // onCellClick: (cellIndex, colIndex) => {
                                //     if (colIndex.colIndex === 0){
                                //         window.location.href = `http://127.0.0.1:8000/api/projects/${cellIndex.split(' ')[1]}`
                                //     }

                            }
                        }

                    />

                </Container>
                : null
            }

        </>

    )
}