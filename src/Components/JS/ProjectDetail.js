import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useLocation} from "react-router";

export default function ProjectDetail(props) {

    const [assignedUsers, setAssignedUsers] = useState(null)
    const [assignedTickets, setAssignedTickets] = useState(null)
    const [loading, setLoading] = useState(null)
    //Get project ID from the location URL
    // let deletedUserID
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
                                        // selectableRows: 'none'
                                        onRowsDelete: (rowsDeleted) => {
                                            //on row delete get the user ID corresponding to the row and call the function
                                            let deletedUserID = assignedUserData()[rowsDeleted.data[0].dataIndex][3]

                                            deleteProjectUser(deletedUserID)

                                        },
                                        print: false
                                    }
                                }
                            />


                        </Grid>

                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <MUIDataTable
                                columns={['Ticket title', 'Description', 'Priority']}
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