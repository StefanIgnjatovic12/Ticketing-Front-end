import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UserSelectMenus from "./UserSelectMenus";
import Container from "@mui/material/Container";
import * as React from "react";
import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
// import {useLocation} from "react-router";
import {Alert, AlertTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {v4 as uuidv4} from "uuid";

export default function UserManagement() {
    // let location = useLocation();
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
    const [userAlreadyAssignedToProject, setUserAlreadyAssignedToProject] = useState(false)
    const [userAlreadyAssignedToTicket, setUserAlreadyAssignedToTicket] = useState(false)
    const [selectedUserNotAdminOrDev, setSelectedUserNotAdminOrDev] = useState(false)
    //Tickets
    const [assignableTickets, setAssignableTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)

    //Array to populate the User table
    const userData = () => {
        let userDataArr = []
        users.forEach(user => {
            userDataArr.push([
                `${user.first_name} ${user.last_name}`,
                user.email,
                user.roles.assigned_role !== null ? user.roles.assigned_role : "",
                //if user has assigned projects/ticket map them to a list within the cell
                user.assigned_projects !== null
                    ? user.assigned_projects.map(project => <li key={uuidv4()}>{project}</li>)
                    : "",

                user.assigned_tickets !== null
                    ? user.assigned_tickets.map(ticket => <li key={uuidv4()}>{ticket}</li>)
                    : ""
            ])
        })
        return userDataArr

    }
    //handle change for selecting names in UserSelectMenus component
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

    const handleTicketChange = (event) => {
        setSelectedTicket(event.target.value)
    }

    //edit role of user based on UserSelectMenus component inputs
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
            ? fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/update-role/${selectedUser}/`, requestOptions)
            : fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/update-role/`, requestOptions)

        setSelectedRole(null)

        // localStorage.setItem('role', createRolePayload()['assigned_role'])
    }
    //fetch user data to populate table
    useEffect(() => {
            const fetchUsers = (num) => {
                fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/users/?limit=${num}`)
                    .then(response => response.json())
                    .then(data => {
                        setUsers(data)
                        setLoading(true)


                    })
                    .catch(error => console.log(error))
            }

            fetchUsers(100)
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
        fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/assigned-user-add/projects/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data === "User already assigned to project") {
                    setUserAlreadyAssignedToProject(true)
                }
                return data
            })
            .then(setSelectedProject(null))
            .catch(error => console.log(error))
    }

    //API call to assign users to ticket
    const assignToTicket = () => {
        setSearchDone(Math.floor(Math.random() * 1000))
        let assigntoTicketPayload = {
            ticket: selectedTicket,
            user: selectedUser
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(assigntoTicketPayload)
        }
        fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/assigned-user-add/tickets/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data === "Ticket already assigned to user") {
                    setUserAlreadyAssignedToTicket(true)
                } else if (data === 'Tickets can only be assigned to developers or admins') {
                    setSelectedUserNotAdminOrDev(true)
                }
                return data
            })
            .then(setSelectedTicket(null))
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

                            <UserSelectMenus
                                users={users}
                                loading={loading}
                                personName={personName}
                                selectedUser={selectedUser}
                                handleChangeMultiple={handleChangeMultiple}
                                //roles
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
                                //tickets
                                assignableTickets={assignableTickets}
                                setAssignableTickets={setAssignableTickets}
                                selectedTicket={selectedTicket}
                                setSelectedTicket={setSelectedTicket}
                                handleTicketChange={handleTicketChange}
                                assignToTicket={assignToTicket}
                            />


                        </Paper>
                        : null
                    }
                    {/*if user is already assigned to project or ticket open alert*/}
                    {
                        userAlreadyAssignedToProject
                        || userAlreadyAssignedToTicket
                        || selectedUserNotAdminOrDev
                            ? <Alert
                                severity="error"
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={() => {

                                            setUserAlreadyAssignedToProject(false)
                                            setUserAlreadyAssignedToTicket(false)
                                            setSelectedUserNotAdminOrDev(false)

                                        }}
                                    >
                                        x
                                    </Button>
                                }

                            >

                                <AlertTitle>Error</AlertTitle>
                                {userAlreadyAssignedToProject
                                    ? 'The selected user is already assigned to that project'
                                    : userAlreadyAssignedToTicket
                                        ? 'The selected user is already assigned to that ticket'
                                        : 'Tickets can only be assigned to developers and admins'
                                }

                            </Alert>
                            : null
                    }

                </Grid>
                {/* Recent UserTable */}
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    {loading
                        ? <MUIDataTable
                            columns={['Name', 'Email', 'Role', 'Assigned projects', 'Assigned tickets']}
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