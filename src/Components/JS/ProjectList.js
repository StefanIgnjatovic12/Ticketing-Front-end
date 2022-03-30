import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import AddProject from "./AddProject";
import {getTime} from "./getTime";


export default function ProjectList() {
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(null)
    const [addProject, setAddProject] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

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
    useEffect(() => {
        const addProjectFetch = () => {


            let projectPayload = {
                'project': addProject,
                'selected_users': selectedUser,
                'created_on': getTime()
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(projectPayload)

            }
            // console.log(JSON.stringify(ticketPayload))
            fetch('http://127.0.0.1:8000/api/project-create/', requestOptions)
                .then(response => console.log(response.json()))
                .then(setAddProject(null))
                .catch(error => console.log(error))


        }
        if (addProject) {
            addProjectFetch()
            fetch('http://127.0.0.1:8000/api/projects')
                .then(response => response.json())
                .then(data => {
                    setProjects(data)
                    setLoading(true)
                })
        }

    }, [addProject])

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

    const deleteProjectFetch = (deleteProjectArray) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(deleteProjectArray)
        }
        fetch(`http://127.0.0.1:8000/api/project-delete/`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

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
                                customToolbar: () => {
                                            return (
                                                <AddProject
                                                    setAddProject={setAddProject}
                                                    setSelectedUser={setSelectedUser}
                                                    selectedUser={selectedUser}
                                                />
                                            );
                                        },
                                print: false,
                                download: false,
                                viewColumns: false,
                                onRowsDelete: (rowsDeleted) => {
                                // console.log(rowsDeleted.data)
                                //on row delete get the user ID corresponding to the row and call the function
                                let deleteProjectArray = []
                                rowsDeleted.data.forEach(row => deleteProjectArray.push(projectData()[row.dataIndex][4]))
                                deleteProjectFetch(deleteProjectArray)
                                // console.log(deleteProjectArray)

                            }

                            }
                        }

                    />

                </Container>
                : null
            }

        </>

    )
}