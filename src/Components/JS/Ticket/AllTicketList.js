import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
import TicketBreakdown from "../DeveloperDashboard/TicketBreakdown";
import ShowMoreText from "react-show-more-text";
import {Link} from "react-router-dom";

export default function AllTicketList() {
    const [ticketData, setTicketData] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const requestOption = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        fetch('https://drf-react-ticketing-backend.herokuapp.com/api/tickets/', requestOption)
            .then(response => response.json())
            .then(data => {
                setTicketData(data)
                setLoading(true)

            })
            .catch(error => console.log(error))
    }, [])

    const formatTicketData = () => {
        let formattedTicketArray = []
        ticketData.forEach(ticket => {
            formattedTicketArray.push([
                ticket.title,
                <ShowMoreText
                    lines={2}
                    more="more"
                    less="less"

                >
                    {ticket.description}
                </ShowMoreText>,
                ticket.priority,
                `${ticket.created_by.first_name} ${ticket.created_by.last_name}`,
                (ticket?.assigned_developer?.last_name
                    ? `${ticket.assigned_developer.first_name} ${ticket.assigned_developer.last_name}`
                    : 'Unassigned'),
                ticket.id,
                ticket.project.id


            ])
        })
        return formattedTicketArray
    }

    return (
        <>
            <TicketBreakdown/>
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                <Grid container>
                    {loading
                        ? <Grid item xs={12} sm={12} md={12} lg={12} ml={12} sx={{ml: 0}}>
                            <MUIDataTable
                                columns={['Ticket title', 'Description', 'Priority', 'Created by', 'Assigned developer', {
                                    name: "",
                                    options: {
                                        filter: false,

                                        //makes the content of the column into a href
                                        customBodyRender: (value) => {
                                            return (
                                                <Link to={`/tickets/${value}`} style={{textDecoration: 'none'}}>View/Modify
                                                    Ticket</Link>
                                            );
                                        }
                                    }
                                },
                                    {
                                        name: "",
                                        options: {
                                            filter: false,

                                            //makes the content of the column into a href
                                            customBodyRender: (value) => {
                                                return (
                                                    <Link to={`/projects/${value}`} style={{textDecoration: 'none'}}>View
                                                        Parent
                                                        Project</Link>
                                                );
                                            }
                                        }
                                    }
                                ]}
                                data={formatTicketData()}
                                title={'All tickets'}
                                options={
                                    {
                                        selectableRows: 'none',
                                        print: false

                                    }
                                }
                            />
                        </Grid>
                        : null}

                </Grid>
            </Container>
        </>
    )
}