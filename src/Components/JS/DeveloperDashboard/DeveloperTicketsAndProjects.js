import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MUIDataTable from "mui-datatables";
import AddTicket from "../Ticket/AddTicket";
import TicketBreakdown from "./TicketBreakdown";
import ShowMoreText from "react-show-more-text";

export default function DeveloperTicketsAndProjects() {
    const currentUserRole = localStorage.getItem('role')
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
        fetch(`http://127.0.0.1:8000/api/developers-tickets-projects/${current_user_id}`, requestOption)
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

        ticketsAndProjects[0]['tickets'].forEach(ticket => {
            ticketArray.push([
                ticket.title,
                <ShowMoreText
                    lines={2}
                    more="more"
                    less="less"

                >
                    {ticket.description}
                </ShowMoreText>,
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
                <ShowMoreText
                    lines={2}
                    more="more"
                    less="less"

                >
                    {project.description}
                    </ShowMoreText>,
                project.created_by,
                project.created_on,
                project.id
            ])
        })
        return [projectArray, ticketArray]

    }
    return (<>
        {/*table containing personnel assigned to project*/}
        {currentUserRole == 'Admin' || currentUserRole == 'Developer'
            ? <TicketBreakdown/>
            : null
        }

        {loading ? <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <MUIDataTable
                        columns={['Title', 'Description', 'Created by', 'Created on', {
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
                        }]}
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
                        title={currentUserRole == 'User'? 'Submitted tickets':'Your tickets'}
                    />

                </Grid>
            </Grid>
        </Container> : null}
    </>)
}