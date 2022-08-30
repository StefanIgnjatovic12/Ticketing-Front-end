import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddTicket from "../Ticket/AddTicket";
import {getTime} from "../getTime";
import ProjectEditForm from "./ProjectEditForm";
import ShowMoreText from "react-show-more-text";
import {useNavigate, useLocation} from "react-router-dom";

export default function ProjectDetail() {

    // const { fetchCurrentUser } = useAuth()
    const [projectInfo, setProjectInfo] = useState(null)
    const [projectEditForm, setProjectEditForm] = useState(null)
    const [assignedUsers, setAssignedUsers] = useState(null)
    const [assignedTickets, setAssignedTickets] = useState(null)
    const [loading, setLoading] = useState(null)
    const [addTicket, setAddTicket] = useState(null)
    //Get project ID from the location URL
    let location = useLocation();
    let projectID = location.pathname

    let currentUserID = localStorage.getItem('id')
    let currentUserRole = localStorage.getItem('role')
    const navigate = useNavigate()

    //get personnel attached to project
    useEffect(() => {

        const fetchProjectPersonnel = (ID) => {
            fetch(`https://drf-react-ticketing-backend.herokuapp.com/api${ID}`)
                .then(response => response.json())
                .then(data => {
                    let performStateUpdate = true
                    let permittedUsers = []
                    //push user ids of those assigned to project to array
                    data[0].assigned_users.forEach(user => {
                        permittedUsers.push(user.user_id)
                    })
                    if (!permittedUsers.includes(parseInt(currentUserID))) {
                        if (currentUserRole !== 'Admin') {
                            performStateUpdate = false
                            navigate('/unauthorized')
                        }
                    }
                    if (performStateUpdate) {
                        setProjectInfo(data[0].project_info)
                        setAssignedUsers(data[0].assigned_users)
                        setAssignedTickets(data[0].assigned_tickets)
                        setLoading(true)
                    }

                })
                .catch(error => console.log(error))
        }

        // console.log('useEffect called')
        // fetchCurrentUser()
        fetchProjectPersonnel(projectID)
    }, [])

    //Project update
    useEffect(() => {

        const editProjectData = (projectID) => {
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(projectEditForm)

            }
            console.log(projectEditForm)
            fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/project-update/${projectID.split('/')[2]}/`, requestOptions)
                .then(response => console.log(response.json()))
                .then(setProjectEditForm(null))
                .catch(error => console.log(error))

        }

        if (projectEditForm) {
            editProjectData(projectID)
            fetch(`https://drf-react-ticketing-backend.herokuapp.com/api${projectID}`)
                .then(response => response.json())
                .then(data => {
                    setProjectInfo(data[0].project_info)
                    setAssignedUsers(data[0].assigned_users)
                    setAssignedTickets(data[0].assigned_tickets)
                    setLoading(true)

                })
                .catch(error => console.log(error))

        }
    }, [projectEditForm])

    //convert assigned user data to array format required by the datatable
    const assignedUserData = () => {
        let assignedUserDataArr = []
        assignedUsers.forEach(person => {
            assignedUserDataArr.push([
                person.username,
                person.email,
                person.assigned_role,
                person.user_id
            ])
        })

        return assignedUserDataArr
    }

    //convert assigned ticket data to array format required by the datatable
    const assignedTicketData = () => {
        let assignedTicketDataArr = []
        assignedTickets.forEach(ticket => {
            assignedTicketDataArr.push([
                ticket.title,
                <ShowMoreText
                    lines={2}
                    more="more"
                    less="less"

                >
                    {ticket.description}
                </ShowMoreText>,
                ticket.priority,
                ticket.created_by,
                ticket.id


            ])
        })
        return assignedTicketDataArr
    }


    //remove user or ticket from project
    const deleteProjectUser = (deleteUserIDArray) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(deleteUserIDArray)
        }
        fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/assigned-user-delete${projectID}/`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
    const deleteTicket = (deleteTicketArray) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(deleteTicketArray)
        }
        fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/ticket-delete/`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    //-----------ADD TICKET ------------
    useEffect(() => {
        const addTicketFetch = () => {

            let ticketPayload = {
                'ticket': addTicket,
                'parent_project': projectID.split('/')[2],
                'created_on': getTime()
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(ticketPayload)

            }
            // console.log(JSON.stringify(ticketPayload))
            fetch('https://drf-react-ticketing-backend.herokuapp.com/api/ticket-create/', requestOptions)
                .then(response => console.log(response.json()))
                .then(setAddTicket(null))
                .catch(error => console.log(error))


        }
        if (addTicket) {
            addTicketFetch()
            fetch(`https://drf-react-ticketing-backend.herokuapp.com/api${projectID}`)
                .then(response => response.json())
                .then(data => {
                    setAssignedTickets(data[0].assigned_tickets)
                    setLoading(true)
                })
                .catch(error => console.log(error))
        }

    }, [addTicket])
    return (
        <>
            {/*table containing personnel assigned to project*/}
            {loading
                ? <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                    {/*PROJECT DETAILS TABLE*/}
                    <Grid container spacing={3} direction='row' justifyContent="space-between"
                          alignItems="flex-start">

                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{mb: 4}}>
                            <MUIDataTable
                                columns={['Project title', 'Project description', 'Created by', 'Created on']}
                                data={loading ? [Object.values(projectInfo)] : null}
                                title={`Details for project ${projectInfo.title}`}
                                options={
                                    {
                                        customToolbar: () => {
                                            return (
                                                <ProjectEditForm
                                                    setProjectEditForm={setProjectEditForm}
                                                />
                                            );
                                        },
                                        print: false,
                                        download: false,
                                        search: false,
                                        filter: false,
                                        viewColumns: false,
                                        selectableRows: 'none'
                                    }

                                }
                            >
                            </MUIDataTable>
                        </Grid>
                    </Grid>


                    <Grid container spacing={3} direction='row' justifyContent="space-between"
                          alignItems="flex-start">
                        {/*PERSONNEL TABLE*/}
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <MUIDataTable
                                columns={['User name', 'Email', 'Role', {
                                    name: "",
                                    options: {
                                        filter: false,

                                        //makes the content of the column into a href
                                        customBodyRender: (value) => {
                                            return (
                                                <a href={`http://drf-react-ticketing-frontend.herokuapp.com/users/${value}`}>View user page</a>
                                            );
                                        }
                                    }
                                }]}
                                data={assignedUserData()}
                                title={'Personnel assigned to project'}
                                options={
                                    {

                                        onRowsDelete: (rowsDeleted) => {
                                            //on row delete get the user ID corresponding to the row and call the function
                                            let deleteUserIDArray = []
                                            rowsDeleted.data.forEach(row => deleteUserIDArray.push(assignedUserData()[row.dataIndex][3]))

                                            deleteProjectUser(deleteUserIDArray)
                                        },
                                        selectableRows: localStorage.getItem('role') === 'Admin' ? 'multiple' : 'none',

                                    }
                                }
                                // https://github.com/gregnb/mui-datatables/issues/1881
                                // onRowsDelete: (rowsDeleted) => {
                                //     //on row delete get the user ID corresponding to the row and call the function
                                //     let deletedUserID = assignedUserData()[rowsDeleted.data[0].dataIndex][3]
                                //     dialog
                                //         .confirm('Are you sure you want to remove this user from the project?')
                                //         .then(value => {
                                //             console.log('clicked ok', value)
                                //              deleteProjectUser(deletedUserID)
                                //         })
                                //         .catch(() => {
                                //             console.log("clicked cancel");
                                //             return false;
                                //         })
                                // },
                                // print: false


                            />


                        </Grid>
                        {/*TICKETS TABLE*/}
                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <MUIDataTable
                                columns={['Ticket title', 'Description', 'Priority', 'Created by', {
                                    name: "",
                                    options: {
                                        filter: false,

                                        //makes the content of the column into a href
                                        customBodyRender: (value) => {
                                            return (
                                                <a href={`http://drf-react-ticketing-frontend.herokuapp.com/tickets/${value}`}>View/Modify
                                                    Ticket</a>
                                            );
                                        }
                                    }
                                }]}
                                data={assignedTicketData()}
                                title={'Tickets assigned to project'}
                                options={
                                    {
                                        customToolbar: () => {
                                            return (
                                                <AddTicket
                                                    setAddTicket={setAddTicket}
                                                />
                                            );
                                        },
                                        onRowsDelete: (rowsDeleted) => {
                                            //on row delete get the ticket ID corresponding to the row and call the function
                                            // let deletedticketID = assignedTicketData()[rowsDeleted.data[0].dataIndex][4]
                                            // deleteProjectTicket(deletedticketID)
                                            let deleteTicketArray = []
                                            rowsDeleted.data.forEach(row => deleteTicketArray.push(assignedTicketData()[row.dataIndex][4]))
                                            deleteTicket(deleteTicketArray)
                                        },
                                        print: false,
                                        selectableRows: localStorage.getItem('role') === 'Admin' ? 'multiple' : 'none',


                                    }
                                }
                            />

                        </Grid>
                    </Grid>
                </Container>
                : null}
        </>
    )
}