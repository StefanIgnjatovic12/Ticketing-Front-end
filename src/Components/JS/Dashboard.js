import * as React from 'react';
import {useEffect, useState} from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import Orders from './Orders';
import SelectMenu from './SelectMenu'
import Cookies from 'js-cookie'

function Copyright(props) {
    return (<Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>);
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    '& .MuiDrawer-paper': {
        position: 'relative', whiteSpace: 'nowrap', width: drawerWidth, transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }), boxSizing: 'border-box', ...(!open && {
            overflowX: 'hidden', transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
            }), width: theme.spacing(7), [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}),);

const mdTheme = createTheme();

function DashboardContent() {
    //fetching data
    let dataObj
    const csrftoken = Cookies.get('csrftoken');
    const [loading, setLoading] = useState(null)
    const [users, setUsers] = useState(null)
    //number of rows to display
    const [numUserRows, setnumUserRows] = useState(10)
    const [personName, setPersonName] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [selectedRole, setSelectedRole] = useState("")
    //handle change for selecting names in SelectMenu component
    const handleChangeMultiple = (event) => {
        const {options} = event.target;

        const value = [];
        const selectedID = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
                selectedID.push(options[i].getAttribute('id'))
            }
        }

        setPersonName(value);
        setSelectedUser(selectedID)


    };
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value)


    }
    //edit role of user based on SelectMenu component inputs
    const createPayload = () => {
        let putPayload = []
        if (selectedUser.length > 0 && selectedRole.length > 0) {
            for (let i = 0; i < selectedUser.length; i++) {
                putPayload.push({
                    user: selectedUser[i],
                    assigned_role: selectedRole
                })

            }
        }
        console.log(putPayload)
        console.log(selectedRole)
        console.log(selectedUser)
        return putPayload

    }


    const editRole = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createPayload)

        }
        fetch(`http://127.0.0.1:8000/api/update-role/`, requestOptions)

    }
    //fetch user data to populate table
    useEffect(() => {

            const fetchUsers = (num) => {
                fetch(`http://127.0.0.1:8000/api/users/?limit=${num}`)
                    .then(response => response.json())
                    .then(data => {
                        dataObj = data
                        setUsers(dataObj)
                        setLoading(true)

                    })
            }
            //if the text box is left empty state reverts to empty so in that case use 10
            fetchUsers(numUserRows > 0 ? numUserRows : 10)
        }

        , [numUserRows])


    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px', ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{my: 1}}/>
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3} direction='row' justifyContent="space-between"
                              alignItems="flex-start">
                            {/* Chart */}
                            {/*<Grid item xs={12} md={8} lg={9}>*/}
                            {/*    /!*<Paper*!/*/}
                            {/*    /!*    sx={{*!/*/}
                            {/*    /!*        p: 2, display: 'flex', flexDirection: 'column', height: 240,*!/*/}
                            {/*    /!*    }}*!/*/}
                            {/*    /!*>*!/*/}
                            {/*    /!*    <Chart/>*!/*/}
                            {/*    /!*</Paper>*!/*/}
                            {/*</Grid>*/}
                            {/*/!* Recent Deposits *!/*/}
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2, display: 'flex', flexDirection: 'column',
                                    }}
                                >
                                    <SelectMenu
                                        users={users}
                                        loading={loading}
                                        personName={personName}
                                        handleChangeMultiple={handleChangeMultiple}
                                        editRole={editRole}
                                        selectedRole={selectedRole}
                                        handleRoleChange={handleRoleChange}
                                        createPayload={createPayload}
                                    />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    <Orders
                                        users={users}
                                        loading={loading}
                                        setnumUserRows={setnumUserRows}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{pt: 4}}/>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
        ;
}

export default function Dashboard() {
    return <DashboardContent/>;
}