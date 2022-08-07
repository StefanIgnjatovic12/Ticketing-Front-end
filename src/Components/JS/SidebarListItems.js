import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";
import {ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";


export default function SideBarListItems(props) {
    const currentUserRole = localStorage.getItem('role')
    const currentUserName = localStorage.getItem('user')
    return (
        currentUserRole === 'Admin'
            ? <>
                {/*hide welcome text on top of list if dashboard drawer is closed*/}
                {props.hideWelcomeText
                    ? null
                    : <ListItem>
                        {/*<ListItemIcon>*/}
                        {/*</ListItemIcon>*/}
                        <Typography>
                            Welcome
                        </Typography>

                        <Typography sx={{color: "#1976D2", ml: 1}}>
                            {currentUserName}
                        </Typography>
                    </ListItem>
                }


                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <Link to="/maindash" style={{textDecoration: 'none'}}>Your dashboard</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <GroupAddIcon/>
                    </ListItemIcon>
                    <Link to="/manage" style={{textDecoration: 'none'}}>User Management</Link>
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <AccountTreeIcon/>
                    </ListItemIcon>
                    <Link to="/projects" style={{textDecoration: 'none'}}>All Projects</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ConfirmationNumberIcon/>
                    </ListItemIcon>
                    <Link to="/alltickets" style={{textDecoration: 'none'}}>All Tickets</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <Link to="/signout" style={{textDecoration: 'none'}}>Sign out</Link>
                </ListItemButton>
            </>
            :
            <>
                <ListItem>
                    <ListItemIcon>
                    </ListItemIcon>
                    <Typography>
                        Welcome
                    </Typography>

                    <Typography sx={{color: "#1976D2", ml: 1}}>
                        {currentUserName}
                    </Typography>
                </ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <Link to="/maindash" style={{textDecoration: 'none'}}>Your dashboard</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <Link to="/signout" style={{textDecoration: 'none'}}>Sign out</Link>
                </ListItemButton>
            </>
    )
}
