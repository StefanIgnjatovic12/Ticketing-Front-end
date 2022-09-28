import * as React from 'react';
import {useState} from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserManagement from "./UserManagement/UserManagement";
import ProjectList from "./Project/ProjectList";
import ProjectDetail from "./Project/ProjectDetail";
import TicketDetail from "./Ticket/TicketDetail";
import AllTicketList from "./Ticket/AllTicketList";
import DeveloperTicketsAndProjects from "./DeveloperDashboard/DeveloperTicketsAndProjects";
import AutocompleteSearch from "./DeveloperDashboard/AutocompleteSearch";
import SideBarListItems from "./SidebarListItems";
import Unauthorized from "./Authentication/Unauthorized";
import PasswordResetConf from "./Authentication/PasswordResetConf";
import {useNavigate} from "react-router-dom";


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

export default function DashboardContent(props) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true);
    const [hideWelcomeText, setHideWelcomeText] = useState(false)
    const toggleDrawer = () => {
        setOpen(!open);
        setHideWelcomeText(!hideWelcomeText)


    };

    return (<ThemeProvider theme={mdTheme}>
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
                        sx={{flexGrow: 1, cursor:"pointer"}}
                        onClick={() => navigate('/maindash')}

                    >
                        {localStorage.getItem('role') === 'Admin'
                            ? "Admin Dashboard"
                            : localStorage.getItem('role') === 'Developer'
                                ? "Developer Dashboard"
                                : "User Dashboard"}
                    </Typography>
                    <AutocompleteSearch/>
                    {/*<IconButton color="inherit">*/}
                    {/*    <Badge badgeContent={4} color="secondary">*/}
                    {/*        <NotificationsIcon/>*/}
                    {/*    </Badge>*/}
                    {/*</IconButton>*/}
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
                    <SideBarListItems
                    hideWelcomeText={hideWelcomeText}
                    />
                    {/*{mainListItems}*/}
                    {/*<Divider sx={{my: 1}}/>*/}
                    {/*{secondaryListItems}*/}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                {props.role && <UserManagement/>}
                {props.project && <ProjectList/>}
                {props.projectDetail && <ProjectDetail/>}
                {props.ticketDetail && <TicketDetail/>}
                {props.allTickets && <AllTicketList/>}
                {props.mainDash && <DeveloperTicketsAndProjects/>}
                {props.userPage && <DeveloperTicketsAndProjects/>}
                {props.unauthorized && <Unauthorized/>}
                {props.passReset && <PasswordResetConf/>}

            </Box>
        </Box>
    </ThemeProvider>);
}

// export default function Dashboard() {
//     return <DashboardContent/>;
// }