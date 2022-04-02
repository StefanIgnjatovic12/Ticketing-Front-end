import {useEffect, useState} from "react";
import AddTicket from "./AddTicket";
import MUIDataTable from "mui-datatables";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
import TicketBreakdown from "../DeveloperDashboard/TicketBreakdown";

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
        fetch('http://127.0.0.1:8000/api/tickets/', requestOption)
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
                ticket.description,
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
                        ? <Grid item xs={12} sm={12} md={12} lg={12} ml={12} sx={{ml:0}}>
                            <MUIDataTable
                                columns={['Ticket title', 'Description', 'Priority', 'Created by', 'Assigned developer', {
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
                                },
                                    {
                                        name: "",
                                        options: {
                                            filter: false,

                                            //makes the content of the column into a href
                                            customBodyRender: (value) => {
                                                return (
                                                    <a href={`http://localhost:3000/projects/${value}`}>View Parent
                                                        Project</a>
                                                );
                                            }
                                        }
                                    }
                                ]}
                                data={formatTicketData()}
                                title={'All tickets'}
                                options={
                                    {

                                        // onRowsDelete: (rowsDeleted) => {
                                        //     //on row delete get the ticket ID corresponding to the row and call the function
                                        //     // let deletedticketID = assignedTicketData()[rowsDeleted.data[0].dataIndex][4]
                                        //     // deleteProjectTicket(deletedticketID)
                                        //     let deleteTicketArray = []
                                        //     rowsDeleted.data.forEach(row => deleteTicketArray.push(assignedTicketData()[row.dataIndex][4]))
                                        //     deleteTicket(deleteTicketArray)
                                        // },
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