import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from "react-router-dom";

const currentUserRole = localStorage.getItem('role')

export const mainListItems = (
    currentUserRole == 'Admin'
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
);

export const secondaryListItems = (
    <>
        {/*<ListSubheader component="div" inset>*/}
        {/*  Saved reports*/}
        {/*</ListSubheader>*/}
        {/*<ListItemButton>*/}
        {/*  <ListItemIcon>*/}
        {/*    <AssignmentIcon />*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="Current month" />*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*  <ListItemIcon>*/}
        {/*    <AssignmentIcon />*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="Last quarter" />*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*  <ListItemIcon>*/}
        {/*    <AssignmentIcon />*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="Year-end sale" />*/}
        {/*</ListItemButton>*/}
    </>
);