import {useEffect, useState} from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import Toolbar from "@mui/material/Toolbar";
import {AppBar} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useLocation} from "react-router";

export default function TicketBreakdown() {
    const [ticketPriority, setTicketPriority] = useState(null)
    const [ticketStatus, setTicketStatus] = useState(null)
    const [ticketType, setTicketType] = useState(null)
    const [loading, setLoading] = useState(false)
    let location = useLocation()
    let URL
    //if developer page, get ticket breakdown for developer, else get breakdown for all tickets
    location.pathname === "/maindash"
        ? URL = `https://drf-react-chat-backend.herokuapp.com/api/dev-ticket-breakdown/${localStorage.getItem('id')}/`
        : URL = 'https://drf-react-chat-backend.herokuapp.com/api/all-ticket-breakdown/'

    useEffect(() => {
        const fetchTicketBreakdown = () => {
            const requestOption = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }

            fetch(URL, requestOption)
                .then(response => response.json())
                .then(data => {
                    setTicketPriority(data['tickets_by_priority'])
                    setTicketStatus(data['tickets_by_status'])
                    setTicketType(data['tickets_by_type'])
                    setLoading(true)
                })
                .catch(error => console.log(error))

        }
        fetchTicketBreakdown()
    }, [])

    ChartJS.register(ArcElement, Tooltip, Legend);
    let ticketStatusData = {
        labels: loading && Object.keys(ticketStatus),
        datasets: [
            {
                label: 'Tickets by priority',
                data: loading && Object.values(ticketStatus),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    let ticketPriorityData = {
        labels: loading && Object.keys(ticketPriority),
        datasets: [
            {
                label: 'Tickets by priority',
                data: loading && Object.values(ticketPriority),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    let ticketTypeData = {
        labels: loading && Object.keys(ticketType),
        datasets: [
            {
                label: 'Tickets by priority',
                data: loading && Object.values(ticketType),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            {/*if all data is 0, dont display the graphs*/}
            {ticketPriority
                ? Object.values(ticketPriority).every(item => item === 0)
                    ? null
                    : <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={18} direction='row' justifyContent="space-between"
                              alignItems="flex-start">

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <AppBar position="sticky" sx={{width: 400}} elevation={4}>
                                    <Toolbar sx={{backgroundColor: "#1976D2"}}>
                                        <Typography
                                            component="h1"
                                            variant="h6"
                                            color="inherit"
                                            noWrap
                                            sx={{flexGrow: 1}}
                                        >
                                            {location.pathname === '/maindash'
                                                ? "Your tickets by priority"
                                                : location.pathname === '/alltickets'
                                                    ? 'All tickets by priority'
                                                    : location.pathname.split('/')[1] === 'users'
                                                        ? "User's tickets by priority"
                                                        : null }

                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Paper sx={{position: "relative", height: 400, width: 400, p: 2}}>
                                    <Pie
                                        data={ticketPriorityData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
                                        }}

                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <AppBar position="sticky" sx={{width: 400}} elevation={4}>
                                    <Toolbar sx={{backgroundColor: "#1976D2"}}>
                                        <Typography
                                            component="h1"
                                            variant="h6"
                                            color="inherit"
                                            noWrap
                                            sx={{flexGrow: 1}}
                                        >
                                            {location.pathname === '/maindash'
                                                ? "Your tickets by status"
                                                : location.pathname === '/alltickets'
                                                    ? 'All tickets by status'
                                                    : location.pathname.split('/')[1] === 'users'
                                                        ? 'User;s tickets by status'
                                                        : null }
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Paper sx={{position: "relative", height: 400, width: 400, p: 2}}>
                                    <Pie
                                        data={ticketStatusData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
                                        }}

                                    />
                                </Paper>

                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <AppBar position="sticky" sx={{width: 400}} elevation={4}>
                                    <Toolbar sx={{backgroundColor: "#1976D2"}}>
                                        <Typography
                                            component="h1"
                                            variant="h6"
                                            color="inherit"
                                            noWrap
                                            sx={{flexGrow: 1}}
                                        >
                                            {/*{location.pathname === '/maindash'*/}
                                            {/*    ? "Your tickets by type"*/}
                                            {/*    : location.pathname === '/alltickets'*/}
                                            {/*        ? 'All tickets by type'*/}
                                            {/*        : null}*/}
                                            {location.pathname === '/maindash'
                                                ? "Your tickets by type"
                                                : location.pathname === '/alltickets'
                                                    ? 'All tickets by type'
                                                    : location.pathname.split('/')[1] === 'users'
                                                        ? "User's tickets by type"
                                                        : null }
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Paper sx={{position: "relative", height: 400, width: 400, p: 2}}>
                                    <Pie
                                        data={ticketTypeData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
                                        }}

                                    />
                                </Paper>


                            </Grid>
                        </Grid>
                    </Container>
                : null
            }
        </>

    )
}