import {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useLocation} from "react-router";

export default function ProjectDetail(props) {

    const [personnel, setPersonnel] = useState(null)
    const [tickets, setTickets] = useState(null)
    const [loading, setLoading] = useState(null)
    //Get project ID from the location URL
    let deletedUserID
    let location = useLocation();
    let projectID = location.pathname
    //get personnel attached to project
    useEffect(() => {

        const fetchProjectPersonnel = (ID) => {
            fetch(`http://127.0.0.1:8000/api${ID}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setPersonnel(data[0].assigned_users)
                    setTickets(data[0].assigned_tickets)
                    setLoading(true)
                })
                .catch(error => console.log(error))
        }

        // console.log('useEffect called')
        fetchProjectPersonnel(projectID)
    },[])


    const personnelData = () => {
        let personnelDataArr = []
        personnel.forEach(person => {
            personnelDataArr.push([
                person.username,
                person.email,
                person.assigned_role,
                person.user_id
            ])
        })

        return personnelDataArr
    }

    // tickets assigned to project
    const assignedTicketData = () => {
        let assignedTicketDataArr = []
        tickets.forEach(ticket => {
            assignedTicketDataArr.push([
                ticket.title,
                ticket.description,
                ticket.priority
            ])
        })
        return assignedTicketDataArr
    }

    useEffect(() => {
       const deleteProjectUser = (ID) => {

    }
    })

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
                                data={personnelData()}
                                title={'Personnel assigned to project'}
                                options={
                                    {
                                        // selectableRows: 'none'
                                        onRowsDelete:  (rowsDeleted) => {
                                            deletedUserID = personnelData()[rowsDeleted.data[0].dataIndex][3]
                                            console.log(deletedUserID)
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
                                        selectableRows: 'none',
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