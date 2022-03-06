import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import Title from "./Title";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

export default function TicketDetail() {
    const mockData = [['data1', 'data2', 'data3'],
        ['data1', 'data2', 'data3'],
        ['data1', 'data2', 'data3'],]
    const [assignedComments, setAssignedComments] = useState(null)
    const [loading, setLoading] = useState(null)
    let location = useLocation();
    let ticketID = location.pathname

    useEffect(() => {
        const fetchAssignedComments = (ticketID) => {
            fetch(`http://127.0.0.1:8000/api${ticketID}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data[0].comments)
                    setAssignedComments(data[0].comments)
                    setLoading(true)

                })
                .catch(error => console.log(error))
        }
        fetchAssignedComments(ticketID)
    }, [])

    const assignedCommentData = () => {
        let assignedCommentData = []
        assignedComments.forEach(comment => {
            assignedCommentData.push([
                comment.created_by,
                comment.content,
                comment.created_on

            ])
        })
        return assignedCommentData
    }
    return (
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            {/*first row*/}
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper>
                        <Box
                            sx={{
                                width: 1 / 3,
                                pt: 2,
                                pl: 2.5
                            }}
                        >
                            <Typography
                                component="h2"
                                variant="h6"
                                color="#212121"
                                fontSize="1.25rem"
                                gutterBottom

                            >
                                Ticket details

                            </Typography>

                            <Typography variant="subtitle2">
                                test
                            </Typography>
                        </Box>

                    </Paper>
                </Grid>

                {/*Ticket comment table*/}

                {loading ? <Grid item xs={12} sm={12} md={6} lg={6}>
                    <MUIDataTable
                        columns={['Submitter', 'Message', 'Created on']}
                        data={assignedCommentData()}
                        title={"Ticket comments"}
                    />

                </Grid> : null}

            </Grid>
            {/*second row */}
            <Grid sx={{pt: 5}} container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <MUIDataTable
                        columns={['Column1', 'Column2', 'Column3']}
                        data={mockData}
                        title={"Ticket history"}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <MUIDataTable
                        columns={['Column1', 'Column2', 'Column3']}
                        data={mockData}
                        title={"Ticket attachments"}
                    />

                </Grid>
            </Grid>

        </Container>
    )
}