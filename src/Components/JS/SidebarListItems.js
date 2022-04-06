import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom";
import {ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";


export default function SideBarListItems() {
    const currentUserRole = localStorage.getItem('role')
    const currentUserName = localStorage.getItem('user')
    return (
        currentUserRole === 'Admin'
            ? <>
                <ListItem>
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
                    <Link to="/manage" style={{textDecoration: 'none'}}>User Administration</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <Link to="/maindash" style={{textDecoration: 'none'}}>Your dashboard</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingCartIcon/>
                    </ListItemIcon>
                    <Link to="/projects" style={{textDecoration: 'none'}}>All Projects</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <Link to="/alltickets" style={{textDecoration: 'none'}}>All Tickets</Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <Link to="/signout" style={{textDecoration: 'none'}}>Sign out</Link>
                </ListItemButton>
            </>
            :
            <>
                <ListItem>
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
                        <DashboardIcon/>
                    </ListItemIcon>
                    <Link to="/signout" style={{textDecoration: 'none'}}>Sign out</Link>
                </ListItemButton>
            </>
    )
}
