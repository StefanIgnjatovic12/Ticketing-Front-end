import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button'
import {useEffect, useState} from "react";
import {InputLabel} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {v4 as uuidv4} from "uuid";


export default function TicketEditForm(props) {
    const [users, setUsers] = useState(null)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [personName, setPersonName] = useState([])
    // const [selectedUsers, setSelectedUsers] = useState([])
    useEffect(() => {
            const fetchUsers = (num) => {
                fetch(`http://127.0.0.1:8000/api/users/?limit=${num}`)
                    .then(response => response.json())
                    .then(data => {
                        setUsers(data)
                        setLoading(true)
                    })
                    .catch(error => console.log(error))
            }

            fetchUsers(100)
        }

        , [])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const defaultValues = {
        title: "",
        description: "",
    }
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
        props.setSelectedUser(selectedID)


    };
    //changed default state to empty in order to do partial edits
    const [formValues, setFormValues] = useState(defaultValues)
    const handleInputChange = (e) => {

        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.setAddProject(formValues)
        setOpen(false)

    };
    return (
        <>
            <Tooltip title="Create a new project">
                <IconButton onClick={handleClickOpen}>
                    <AddCircleIcon/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>

                <DialogTitle sx={{pl: 4.6}}>Create a new project</DialogTitle>
                <DialogContent>

                    <Box p={2}>
                        {/*<form*/}
                        <Box pb={3}>
                            <TextField
                                fullWidth
                                id="standard-multiline-static"
                                variant="standard"
                                name="title"
                                label="Project title"
                                type="text"
                                multiline
                                maxRows={4}
                                value={formValues.title}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box pb={5}>
                            <TextField
                                fullWidth
                                id="standard-multiline-static"
                                variant="standard"
                                name="description"
                                label="Project description"
                                type="text"
                                multiline
                                maxRows={4}
                                value={formValues.description}
                                onChange={handleInputChange}

                            />

                        </Box>

                        <Box sx={{mb: 2}}>
                            {/*Select user form*/}
                            <FormControl sx={{m: 1, minWidth: 300, maxWidth: 450}}>
                                <InputLabel shrink htmlFor="select-multiple-native">
                                    Select users to assign to project
                                </InputLabel>
                                <Select
                                    multiple
                                    native
                                    value={personName}
                                    // @ts-ignore Typings are not considering `native`
                                    onChange={handleChangeMultiple}
                                    label="Native"
                                    inputProps={{
                                        id: 'select-multiple-native',
                                    }}
                                    sx={{p: 0.5}}

                                >
                                    {/*id on option is set so that when name is selected, its
                        id can be passed to the backend to edit role*/}

                                    {loading
                                        ?users.map((user) => (
                                        <option id={user.id} key={uuidv4()} value={user.username}>
                                            {`${user.first_name} ${user.last_name}`}
                                        </option>
                                    ))
                                    :null}
                                </Select>
                            </FormControl>
                        </Box>
                        {/*</form>*/}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/*<Button onClick={handleClose}>Subscribe</Button>*/}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>


    )
}