import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useEffect, useState} from 'react';
import Title from './Title';
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Popover} from "@mui/material";

export default function RoleSelectMenu(props) {
    let list = [
        {
            "Test project": [
                "Edited",
                "te",
                "test ticket",
                "testticket2"
            ]
        },
        {
            "Project 2": [
                "asd"
            ]
        }
    ]

    //popover
    const [anchorEl, setAnchorEl] = useState(null)
    const [elementClicked, setElementClicked] = useState(null)
    const handlePopoverOpen = (event) => {
        setElementClicked(event.currentTarget.name)
        setAnchorEl(event.currentTarget);
    }
    const handlePopoverClose = () => {
        setAnchorEl(null);
        setElementClicked(null)
    }
    const open = Boolean(anchorEl);
    //
    //tickets

    //
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }

    //load tickets that can be be assigned to selected user > belong to projects theyre assigned to
    useEffect(() => {
        //only fetch data to populate ticket dropdown if 1 user is selected
        if (props.selectedUser.length === 1) {
            console.log('ran')
            fetch(`http://127.0.0.1:8000/api/project-users/${props.selectedUser}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.setSelectedUserTickets(data)
                })

        }

    }, [props.selectedUser])

    //load projects for dropdown
    useEffect(() => {


        fetch('http://127.0.0.1:8000/api/projects/', requestOptions)
            .then(response => response.json())
            .then(data => {
                props.setAllProjects(data)
            })


    }, [])
    return (
        <>
            <Title>Change user role</Title>

            <Box sx={{mb: 2}}>
                {/*Select user form*/}
                <FormControl sx={{m: 1, minWidth: 300, maxWidth: 450}}>
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Users
                    </InputLabel>
                    <Select
                        multiple
                        native
                        value={props.personName}
                        // @ts-ignore Typings are not considering `native`
                        onChange={props.handleChangeMultiple}
                        label="Native"
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                        sx={{p: 0.5}}

                    >
                        {/*id on option is set so that when name is selected, its
                        id can be passed to the backend to edit role*/}

                        {props.users.map((user) => (
                            <option id={user.id} key={user.id} value={user.username}>
                                {`${user.first_name} ${user.last_name}`}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/*-------ROLE DROPDOWN MENU--------- */}
            <Box sx={{
                pb: 2,
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <FormControl sx={{width: 1 / 2, ml: 1}}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="medium"
                        label="Role"
                        value={props.selectedRole}
                        onChange={props.handleRoleChange}
                        //if user isn't selected open popover and disable dropdown
                        onClick={props.selectedUser.length === 0 ? handlePopoverOpen : null}
                        disabled={props.selectedUser.length === 0}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    name="role"
                    variant="contained"
                    href="#contained-buttons"
                    sx={{width: "40%"}}
                    // onClick={props.editRole}
                    onClick={props.selectedRole ? props.editRole : handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}

                >
                    Change role
                </Button>
            </Box>

            {/*-------PROJECT DROPDOWN MENU--------- */}
            <Box sx={{
                pb: 2,
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <FormControl sx={{width: 1 / 2, ml: 1}}>
                    <InputLabel id="demo-simple-select-label">Project</InputLabel>
                    <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="medium"
                        label="Role"
                        value={props.selectedProject}
                        onChange={props.handleProjectChange}
                        onMouseLeave={handlePopoverClose}
                        //if user isn't selected open popover and disable dropdown
                        onClick={props.selectedUser.length === 0 ? handlePopoverOpen : null}
                        disabled={props.selectedUser.length === 0}
                    >
                        {/*map over all projects and display title in dropdown*/}
                        {props.allProjects.map(project =>
                            <MenuItem value={project.title}>{project.title}</MenuItem>
                        )}

                    </Select>
                </FormControl>
                <Button
                    name="project"
                    variant="contained"
                    href="#contained-buttons"
                    sx={{width: "40%"}}
                    //if no user selected or no project selected open popover
                    onClick={props.selectedUser.length === 0 || !props.selectedProject ? handlePopoverOpen : props.assignToProject}
                    onMouseLeave={handlePopoverClose}

                >
                    Assign project
                </Button>

            </Box>
            {/*-------TICKET DROPDOWN MENU--------- */}
            <Box sx={{
                pb: 2,
                display: 'flex',
                justifyContent: 'space-between'
            }}>

                <FormControl sx={{width: 1 / 2, ml: 1}}>
                    <InputLabel id="demo-simple-select-label">Ticket</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="medium"
                        label="Role"
                        value={props.selectedRole}
                        onChange={props.handleRoleChange}

                        //if user isnt selected or project isnt selected
                        // onClick={props.selectedUser.length === 0 || !props.selectedProject ? handlePopoverOpen : null}
                        // onMouseLeave={handlePopoverClose}
                        //if project isn't selected, disable select dropdown menu
                        // disabled={props.selectedUser.length === 0 || !props.selectedProject}
                    >


                        {
                            props.selectedUserTickets.map(project =>
                                <Box>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold', ml: 2}}
                                                value={Object.keys(project)[0]}>{Object.keys(project)[0]}</Typography>
                                    {
                                        Object.entries(project)[0][1].map(ticket =>

                                            <MenuItem sx={{ml: 3}} value={ticket}>{ticket}</MenuItem>)
                                    }
                                </Box>
                            )
                        }

                    </Select>
                </FormControl>
                <Button
                    name="ticket"
                    variant="contained"
                    href="#contained-buttons"
                    sx={{width: "40%"}}
                    // onClick={props.selectedProject? props.assignToProject : handlePopoverOpen}
                    // onMouseLeave={handlePopoverClose}

                >
                    Assign ticket
                </Button>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{p: 2}}>
                        {/*tickets can be selected without project? Check back*/}
                        {/*If trying to do anything with user not selected*/}
                        {props.selectedUser.length === 0
                            ? "Please select a user first"
                            //user selected but project isnt
                            : elementClicked === 'project'
                                ? "Please select a project first"
                                //user selected but role isnt
                                : elementClicked === 'role'
                                    ? "Please select a role first"
                                    //user selected but ticket isnt
                                    : elementClicked === 'ticket'
                                        ? "Please select a ticket first"
                                        //case when user clicks the dropdown menu for the ticket and not the button
                                        : "Please select a project first"
                        }
                    </Typography>
                </Popover>
            </Box>


        </>
    );
}