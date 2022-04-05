import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom";



export default function SideBarListItems() {
    const currentUserRole = localStorage.getItem('role')

    return (
        currentUserRole === 'Admin'
            ? <>
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
