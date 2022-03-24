import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RoleSelectMenu from "./RoleSelectMenu";
import Container from "@mui/material/Container";
import * as React from "react";
import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {useLocation} from "react-router";

export default function RoleManagement() {
    let location = useLocation();
    const [loading, setLoading] = useState(null)
    const [users, setUsers] = useState(null)
    //number of rows to display
    const [personName, setPersonName] = useState([])
    //Roles
    const [selectedUser, setSelectedUser] = useState([])
    const [selectedRole, setSelectedRole] = useState("")
    //Projects
    const [allProjects, setAllProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState("")
    const [searchDone, setSearchDone] = useState(null)

    // useEffect(() => {
    //     // fetchCurrentUser()
    // },[])

    //Array to populate the User table
    const userData = () => {
        let userDataArr = []
        users.forEach(user => {
            userDataArr.push([
                `${user.first_name} ${user.last_name}`,
                user.email,
                user.roles.assigned_role
            ])
        })

        return userDataArr

    }
    //handle change for selecting names in RoleSelectMenu component
    const handleChangeMultiple = (event) => {
        const {options} = event.target;

        const value = [];
        const selectedID = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
                selectedID.push(options[i].getAttribute('id'))
            }
        }

        setPersonName(value);
        setSelectedUser(selectedID)


    };
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value)


    }

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value)
    }
    //edit role of user based on RoleSelectMenu component inputs
    const createRolePayload = () => {
        let putPayload = []
        if (selectedUser.length > 0 && selectedRole.length > 0) {
            for (let i = 0; i < selectedUser.length; i++) {
                putPayload.push({
                    user: selectedUser[i],
                    assigned_role: selectedRole
                })

            }
        }

        return JSON.stringify(putPayload)

    }

    //need to make this so you don't need to refresh the page to see the change
    const editRole = () => {
        //changes the state of search done because it is a dependency of the useState used to fetch data
        //ie the user data gets refetched after the edit automatically without reloading the page
        setSearchDone(Math.floor(Math.random() * 1000))
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: createRolePayload()

        }
        //if only 1 user selected, request sent to endpoint for updating single object in db

        selectedUser === 1
            ? fetch(`http://127.0.0.1:8000/api/update-role/${selectedUser}/`, requestOptions)
            : fetch(`http://127.0.0.1:8000/api/update-role/`, requestOptions)

        // localStorage.setItem('role', createRolePayload()['assigned_role'])
    }
    //fetch user data to populate table
    useEffect(() => {
            const fetchUsers = (num) => {
                fetch(`http://127.0.0.1:8000/api/users/?limit=${num}`)
                    .then(response => response.json())
                    .then(data => {
                        setUsers(data)
                        setLoading(true)


                    })
                    .catch(error => console.log(error))
            }

            fetchUsers(20)
        }

        , [searchDone])

    //API call to assign users to project
    const assignToProject = () => {
        setSearchDone(Math.floor(Math.random() * 1000))
        let assigntoProjectPayload = {
            project: selectedProject,
            user: selectedUser
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(assigntoProjectPayload)
        }
        fetch(`http://127.0.0.1:8000/api/assigned-user-add/projects/`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
    return (

        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={4} lg={4}>

                    {loading
                        ? <Paper
                            sx={{
                                p: 2, display: 'flex', flexDirection: 'column',
                            }}
                        >

                            <RoleSelectMenu
                                users={users}
                                loading={loading}
                                personName={personName}
                                handleChangeMultiple={handleChangeMultiple}
                                editRole={editRole}
                                selectedRole={selectedRole}
                                handleRoleChange={handleRoleChange}
                                createRolePayload={createRolePayload}
                                //projects
                                allProjects={allProjects}
                                setAllProjects={setAllProjects}
                                selectedProject={selectedProject}
                                handleProjectChange={handleProjectChange}
                                assignToProject={assignToProject}
                            />


                        </Paper>
                        : null
                    }

                </Grid>
                {/* Recent UserTable */}
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    {loading
                        ? <MUIDataTable
                            columns={['Name', 'Email', 'Role']}
                            data={userData()}
                            title={"Users"}
                            options={
                                {selectableRows: 'none'}
                            }

                        />
                        : null}

                </Grid>
            </Grid>

        </Container>

    )
}