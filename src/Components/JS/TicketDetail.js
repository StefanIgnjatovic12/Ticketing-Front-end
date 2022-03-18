import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import {useEffect, useState, useRef} from "react";
import {useLocation} from "react-router";
import {Typography} from "@mui/material";
import TicketDetailContent from "./TicketDetailContent"
import TicketEditForm from "./TicketEditForm";
import Box from "@mui/material/Box";
import UploadFile from './UploadFile'
import AddComment from './AddComment'
import {getTime} from './getTime'

export default function TicketDetail() {


    const mockData = [['data1', 'data2', 'data3'],
        ['data1', 'data2', 'data3'],
        ['data1', 'data2', 'data3'],]
    const [assignedComments, setAssignedComments] = useState(null)
    const [fileAttachments, setFileAttachments] = useState(null)
    const [ticketHistory, setTicketHistory] = useState(null)
    const [ticketInfo, setTicketInfo] = useState(null)
    const [ticketEditForm, setTicketEditForm] = useState(null)
    const [addComment, setAddComment] = useState(null)
    const [files, setFiles] = useState(null)
    const [currentTime, setCurrentTime] = useState(null)
    const [loading, setLoading] = useState(null)
    let location = useLocation();
    let ticketID = location.pathname


    //Loading all data on page, called on page load and when a ticket is edited or comment added
    useEffect(() => {


        const fetchTicketData = () => {
            fetch(`http://127.0.0.1:8000/api${ticketID}`)
                .then(response => response.json())
                .then(data => {
                    setAssignedComments(data[0].comments)
                    setTicketInfo(data[0].ticket_info)
                    setFileAttachments(data[0].attachments)
                    setTicketHistory(data[0].ticket_history)
                    setLoading(true)

                })
                .catch(error => console.log(error))
        }

        fetchTicketData()

    }, [])

    //-----------EDIT TICKET DATA ------------
    useEffect(() => {

        //changes the state of ticket edit done because it is a dependency of the useState used to fetch data
        //ie the ticket data gets refetched after the edit automatically without reloading the page
        // setTicketEditDone(Math.floor(Math.random() * 1000))

        const editTicketData = (ticketID) => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(ticketEditForm)

            }
            fetch(`http://127.0.0.1:8000/api/ticket-update/${ticketID.split('/')[2]}/`, requestOptions)
                .then(response => console.log(response.json()))
                .catch(error => console.log(error))

        }

        //makes it so that the API call is only ran when ticket is edited
        //ticket is edited and then API is called to update the content on screen
        if (ticketEditForm) {
            editTicketData(ticketID)
            fetch(`http://127.0.0.1:8000/api${ticketID}`)
                .then(response => response.json())
                .then(data => {
                    setTicketInfo(data[0].ticket_info)
                    //set the ticket history so that that table is also updated
                    setTicketHistory(data[0].ticket_history)
                    setLoading(true)

                })
                .catch(error => console.log(error))

        }


    }, [ticketEditForm])

    //-----------ADD COMMENT ------------
    useEffect(() => {


        const addCommentFetch = async () => {
            const time = await getTime()

            let commentPayload = {
                'comment': addComment,
                'parent_ticket': ticketID.split('/')[2],
                'created_on': time
            }
            console.log(commentPayload)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(commentPayload)

            }
            fetch('http://127.0.0.1:8000/api/comment-create/', requestOptions)
                .then(response => console.log(response.json()))
                .catch(error => console.log(error))


        }
        if (addComment) {
            addCommentFetch()
            fetch(`http://127.0.0.1:8000/api${ticketID}`)
                .then(response => response.json())
                .then(data => {
                    setAssignedComments(data[0].comments)
                    setLoading(true)
                    setAddComment(null)


                })
                .catch(error => console.log(error))
        }

    }, [addComment])

    const assignedCommentData = () => {
        let assignedCommentDataArr = []
        assignedComments.forEach(comment => {
            assignedCommentDataArr.push([
                comment.created_by,
                comment.content,
                comment.created_on,
                comment.id

            ])
        })
        return assignedCommentDataArr
    }

    //-----------DELETE COMMENT  ------------
    const deleteCommentFetch = (deleteCommentArray) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(deleteCommentArray)
        }
        fetch(`http://127.0.0.1:8000/api/comment-delete/`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    //-----------ADD ATTACHMENT ------------

    const attachedFiles = () => {
        let attachedFilesArr = []

        fileAttachments.forEach(attachment => {
            attachedFilesArr.push([
                attachment.file_name,
                attachment.uploaded_by,
                attachment.created_on


            ])
        })

        return attachedFilesArr
    }

    useEffect(() => {
        //append the state which contains the file to the formData
        //append the id of the parent ticket
        let formData = new FormData();

        const addAttachment = async () => {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: formData
            }
            fetch("http://127.0.0.1:8000/api/attachment-upload/", requestOptions)
                .then(response => console.log(response.json()))
                .catch(error => console.log(error))
        }

        if (files) {
            getTime().then(time => {
                    setCurrentTime(time)
                }
            )
            if (currentTime && files) {
                formData.append('created_on', currentTime)
                formData.append('file', files[0])
                formData.append('parent_ticket', ticketID.split('/')[2])
            }


            addAttachment()
            fetch(`http://127.0.0.1:8000/api${ticketID}`)
                .then(response => response.json())
                .then(data => {
                    setFileAttachments(data[0].attachments)
                    setLoading(true)
                    setFiles(null)

                })
                .catch(error => console.log(error))

        }

    }, [files])

    //-----------TICKET HISTORY ------------
    const attachedHistory = () => {
        let attachedHistoryArr = []

        ticketHistory.forEach(ticket_edit => {
            attachedHistoryArr.push([
                ticket_edit.changed_field.charAt(0).toUpperCase() + ticket_edit.changed_field.slice(1),
                ticket_edit.old_value,
                ticket_edit.new_value


            ])
        })

        return attachedHistoryArr
    }
    return (
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            {/*first row*/}
            <Grid container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">
                {loading ? <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            pt: 1.9,
                            pl: 2.75,
                            pr: 2.75,
                            pb: 1

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
                                setTicketEditInfo={setTicketEditForm}
                            />

                        </Box>


                        {loading && <TicketDetailContent
                            ticket_info={ticketInfo}
                        />}

                    </Paper>
                </Grid> : null}

                {/*Ticket comment table*/}

                {loading ? <Grid item xs={12} sm={12} md={6} lg={6}>
                    <MUIDataTable
                        columns={['Submitter', 'Message', 'Created on']}
                        data={assignedCommentData()}
                        options={{
                            print: false,
                            download: false,
                            viewColumns: false,
                            customToolbar: () => {
                                return (
                                    <AddComment
                                        setAddComment={setAddComment}
                                    />
                                );
                            },
                            onRowsDelete: (rowsDeleted) => {
                                // console.log(rowsDeleted.data)
                                //on row delete get the user ID corresponding to the row and call the function
                                let commentIds = []
                                rowsDeleted.data.forEach(row => commentIds.push(assignedCommentData()[row.dataIndex][3]))
                                deleteCommentFetch(commentIds)


                            }
                        }}
                        title={"Ticket comments"}
                    />

                </Grid> : null}

            </Grid>
            {/*second row */}

            <Grid sx={{pt: 5}} container spacing={3} direction='row' justifyContent="space-between"
                  alignItems="flex-start">

                {loading
                    ? <Grid item xs={12} sm={12} md={6} lg={6}>
                        <MUIDataTable
                            columns={['Field', 'Old value', 'New value']}
                            data={attachedHistory()}
                            options={{
                                print: false,
                                download: false,
                                viewColumns: false,

                            }}
                            title={'Ticket history'}
                        />
                    </Grid>
                    : null}

                {loading
                    ? <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/*useeffect runs again when you remove the file because the state changes*/}

                        <MUIDataTable
                            columns={['File', 'Uploader', 'Uploaded on']}
                            data={attachedFiles()}
                            options={{
                                print: false,
                                download: false,
                                viewColumns: false,
                                //adds the upload button to the toolbar
                                customToolbar: () => {
                                    return (
                                        <UploadFile
                                            files={files}
                                            setFiles={setFiles}
                                        />
                                    );
                                }
                            }}
                            title={"Ticket attachments"}

                        />
                    </Grid>
                    : null}


            </Grid>

        </Container>
    )
}