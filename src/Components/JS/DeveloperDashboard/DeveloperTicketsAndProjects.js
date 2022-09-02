import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MUIDataTable from "mui-datatables";
import TicketBreakdown from "./TicketBreakdown";
import ShowMoreText from "react-show-more-text";
import {useLocation} from "react-router";
import {useNavigate} from 'react-router-dom'
export default function DeveloperTicketsAndProjects() {
    const currentUserRole = localStorage.getItem('role')
    const [ticketsAndProjects, setTicketsAndProjects] = useState(null)
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        //if on maindash page, current user is the one logged in. else its admin viewing any users page, use the user page ID
        let current_user_id = location.pathname === "/maindash" ? localStorage.getItem('id') : location.pathname.split('/')[2]
        const requestOption = {
            method: 'GET', headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/developers-tickets-projects/${current_user_id}`, requestOption)
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
        {(currentUserRole === 'Admin' &&  location.pathname === "/maindash") || (currentUserRole === 'Developer' &&  location.pathname === "/maindash")
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
                                        <div onClick={navigate(`/projects/${value}`)}>View/Modify Project</div>
                                    );
                                }
                            }
                        }]}
                        options={{selectableRows: localStorage.getItem('role') === 'Admin' ? 'multiple' : 'none',
                        }}
                        data={formatTicketProject()[0]}
                        title={ location.pathname === "/maindash" ? "Your Projects" : "User's Projects"}
                    />


                </Grid>

                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <MUIDataTable
                        columns={['Ticket title', 'Description', 'Priority', 'Type', 'Created by', 'Created on', {
                            name: "", options: {
                                filter: false,

                                //makes the content of the column into a href
                                customBodyRender: (value) => {
                                    return (<div onClick={navigate(`/tickets/${value}`)} >View/Modify
                                        Ticket</div>);
                                }
                            }
                        }]}
                        data={formatTicketProject()[1]}
                        options={{selectableRows: localStorage.getItem('role') === 'Admin' ? 'multiple' : 'none',
                        }}
                        title={
                            (currentUserRole === 'User' && location.pathname === '/maindash')
                                ? 'Submitted Tickets'
                                : location.pathname.split('/')[1] === 'users'
                                    ? "User's Tickets"
                                    : "Your Tickets"
                        }

                    />

                </Grid>
            </Grid>
        </Container> : null}
    </>)
}