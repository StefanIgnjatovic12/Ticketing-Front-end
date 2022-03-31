import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MUIDataTable from "mui-datatables";
import AddTicket from "../Ticket/AddTicket";

export default function DeveloperDashboard() {
    const [ticketsAndProjects, setTicketsAndProjects] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let current_user_id = localStorage.getItem('id')
        const requestOption = {
            method: 'GET', headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        fetch(`http://127.0.0.1:8000/api/users-tickets-projects/${current_user_id}`, requestOption)
            .then(request => request.json())
            .then(data => {
                setTicketsAndProjects(data)
                setLoading(true)
            })
            .catch(error => console.log(error))

    }, [])

    const formatTicketProject = () => {
        let ticketArray = []
        let projectArray = []
        // console.log(ticketsAndProjects)
        console.log(ticketsAndProjects[0]['projects'])
        ticketsAndProjects[0]['tickets'].forEach(ticket => {
            ticketArray.push([
                ticket.title,
                ticket.description,
                ticket.priority,
                ticket.type,
                ticket.created_by,
                ticket.created_on,
                ticket.id


            ])
        })
        ticketsAndProjects[0]['projects'].forEach(project => {
            projectArray.push([
                project.title,
                project.description,
                project.created_by,
                project.created_on,
                project.id
            ])
        })
        console.log(projectArray)
        console.log(ticketArray)
        return [projectArray, ticketArray]

    }
    return (<>
        {/*table containing personnel assigned to project*/}
        {loading ? <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <MUIDataTable
                        columns={['Title', 'Description', 'Created by', 'Created on']}
                        data={formatTicketProject()[0]}
                        title={'Your Projects'}
                    />


                </Grid>

                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <MUIDataTable
                        columns={['Ticket title', 'Description', 'Priority', 'Type', 'Created by', 'Created on', {
                            name: "", options: {
                                filter: false,

                                //makes the content of the column into a href
                                customBodyRender: (value) => {
                                    return (<a href={`http://localhost:3000/tickets/${value}`}>View/Modify
                                        Ticket</a>);
                                }
                            }
                        }]}
                        data={formatTicketProject()[1]}
                        title={'Your tickets'}
                    />

                </Grid>
            </Grid>
        </Container> : null}
    </>)
}