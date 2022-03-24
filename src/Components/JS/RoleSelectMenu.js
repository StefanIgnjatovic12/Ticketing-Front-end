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
    let test = 2

    //popover
    const [anchorEl, setAnchorEl] = useState(null)
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handlePopoverClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    //

    //load projects
    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        fetch('http://127.0.0.1:8000/api/projects/', requestOptions)
            .then(response => response.json())
            .then(data => props.setAllProjects(data))


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
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    href="#contained-buttons"
                    sx={{width: "40%"}}
                    onClick={props.editRole}

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
                    >
                        {/*map over all projects and display title in dropdown*/}
                        {props.allProjects.map(project =>
                            <MenuItem value={project.title}>{project.title}</MenuItem>
                        )}

                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    href="#contained-buttons"
                    sx={{width: "40%"}}
                    onClick={props.assignToProject}

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

                        //if condition is met, open popover
                        onMouseEnter={test !== 2 ? handlePopoverOpen : null}
                        onMouseLeave={handlePopoverClose}
                        //if condition is met, disable select dropdown menu
                        disabled={test !== 2}
                    >
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold', ml: 2}}
                                    value="Admin">Project:</Typography>
                        <MenuItem sx={{ml: 3}} value="Developer">Developer</MenuItem>
                        <MenuItem sx={{ml: 3}} value="User">User</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    href="#contained-buttons"
                    sx={{width: "40%"}}
                    onClick={props.editRole}

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
                    <Typography sx={{p: 2}}>Please select a user before assigning a ticket.</Typography>
                </Popover>
            </Box>


        </>
    );
}