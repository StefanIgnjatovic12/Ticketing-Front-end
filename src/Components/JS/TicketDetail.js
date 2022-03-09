import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {Typography} from "@mui/material";
import TicketDetailContent from "./TicketDetailContent"
import TicketEditForm from "./TicketEditForm";
import UploadFile from "./UploadFIle"
import Box from "@mui/material/Box";



export default function TicketDetail() {
    const mockData = [['data1', 'data2', 'data3'],
        ['data1', 'data2', 'data3'],
        ['data1', 'data2', 'data3'],]
    const [assignedComments, setAssignedComments] = useState(null)
    const [ticketInfo, setTicketInfo] = useState(null)
    const [ticketEditInfo, setTicketEditInfo] = useState(null)
    const [ticketEditDone, setTicketEditDone] = useState(null)
    const [loading, setLoading] = useState(null)
    const [files, setFiles] = useState(null)
    let location = useLocation();
    let ticketID = location.pathname

    useEffect(() => {
        const fetchTicketData = (ticketID) => {
            fetch(`http://127.0.0.1:8000/api${ticketID}`)
                .then(response => response.json())
                .then(data => {

                    setAssignedComments(data[0].comments)
                    setTicketInfo(data[0].ticket_info)
                    setLoading(true)

                })
                .catch(error => console.log(error))
        }
        fetchTicketData(ticketID)

    }, [ticketEditDone])

    useEffect(() => {

        //changes the state of ticket edit done because it is a dependency of the useState used to fetch data
        //ie the ticket data gets refetched after the edit automatically without reloading the page
        setTicketEditDone(Math.floor(Math.random() * 1000))
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketEditInfo)

        }
        const editTicketData = (ticketID) => {
            fetch(`http://127.0.0.1:8000/api/ticket-update/${ticketID.split('/')[2]}/`, requestOptions)

        }
        editTicketData(ticketID)


    }, [ticketEditInfo])

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

    useEffect(() => {
        console.log(files)
        let formData = new FormData();
        if (files) {
            formData.append('file', files[0])
        }

        //if length of files is 0 > DELETE, if > 0 POST
        const requestOptions = {
            method: 'POST',
            // headers: {
            //     "Accept": "*/*",
            //     'Content-type': 'multipart/form-data'
            // },
            body: formData
        }
        fetch("http://127.0.0.1:8000/api/attachment-upload/", requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }, [files])


    return (
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            {/*first row*/}
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            pt: 1.9,
                            pl: 2.75,
                            pr: 2.75

                        }}>
                            <Typography
                                component="h2"
                                variant="h6"
                                color="#212121"
                                fontSize="1.25rem"
                                fontWeight={500}
                                lineHeight={1.6}
                                letterSpacing="0.0075em"
                                gutterBottom
                            >
                                Details for Ticket

                            </Typography>

                            <TicketEditForm
                                setTicketEditInfo={setTicketEditInfo}
                            />
                        </Box>

                        {loading && <TicketDetailContent
                            ticket_info={ticketInfo}
                        />}

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
                    {/*useeffect runs again when you remove the file because the state changes*/}
                    <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            pt: 1.9,
                            pl: 2.75,
                            pr: 2.75

                        }}>
                            <UploadFile
                            files={files}
                            setFiles={setFiles}
                            />
                        </Box>
                    <MUIDataTable
                        columns={['File', 'Uploader', 'Description', 'Created on']}
                        data={mockData}
                        title={"Ticket history"}
                    />
                </Grid>

            </Grid>

        </Container>
    )
}