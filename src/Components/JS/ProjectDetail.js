import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useLocation} from "react-router";
import {useDialog} from 'muibox'

export default function ProjectDetail() {

    const [assignedUsers, setAssignedUsers] = useState(null)
    const [assignedTickets, setAssignedTickets] = useState(null)
    const [loading, setLoading] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const dialog = useDialog()
    //Get project ID from the location URL
    let location = useLocation();
    let projectID = location.pathname

    //get personnel attached to project
    useEffect(() => {

        const fetchProjectPersonnel = (ID) => {
            fetch(`http://127.0.0.1:8000/api${ID}`)
                .then(response => response.json())
                .then(data => {

                    setAssignedUsers(data[0].assigned_users)
                    setAssignedTickets(data[0].assigned_tickets)
                    setLoading(true)
                })
                .catch(error => console.log(error))
        }

        // console.log('useEffect called')
        fetchProjectPersonnel(projectID)
    }, [])

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
                ticket.description,
                ticket.priority,
                ticket.created_by,
                ticket.id

            ])
        })
        return assignedTicketDataArr
    }

    //remove user or ticket from project
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    }
    //make it so that you can delete multiple users at once > look at how its done in role management
    const deleteProjectUser = (userID) => {
        fetch(`http://127.0.0.1:8000/api/assigned-user-delete${projectID}/${userID}/`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
    const deleteProjectTicket = (ticketID) => {
        fetch(`http://127.0.0.1:8000/api/assigned-ticket-delete${projectID}/${ticketID}/`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }


    return (
        <>

            {/*table containing personnel assigned to project*/}
            {loading
                ? <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3} direction='row' justifyContent="space-between"
                          alignItems="flex-start">
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <MUIDataTable
                                columns={['User name', 'Email', 'Role']}
                                data={assignedUserData()}
                                title={'Personnel assigned to project'}
                                options={
                                    {
                                        //maybe have a separate button that you click before rows become selectable instead
                                        // selectableRows: 'none'
                                        onRowsDelete: (rowsDeleted) => {
                                            //on row delete get the user ID corresponding to the row and call the function
                                            let deletedUserID = assignedUserData()[rowsDeleted.data[0].dataIndex][3]
                                            deleteProjectUser(deletedUserID)
                                        }
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

                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <MUIDataTable
                                columns={['Ticket title', 'Description', 'Priority', 'Created by', {
                                    name: "",
                                    options: {
                                        filter: false,
                                        //makes the content of the column into a href
                                        customBodyRender: (value) => {
                                            return (
                                                <a href={`http://localhost:3000/tickets/${value}`}>View/Modify
                                                    Ticket</a>
                                            );
                                        }
                                    }
                                }]}
                                data={assignedTicketData()}
                                title={'Tickets assigned to project'}
                                options={
                                    {

                                        onRowsDelete: (rowsDeleted) => {
                                            //on row delete get the ticket ID corresponding to the row and call the function
                                            let deletedticketID = assignedTicketData()[rowsDeleted.data[0].dataIndex][3]
                                            deleteProjectTicket(deletedticketID)

                                        },
                                        print: false

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