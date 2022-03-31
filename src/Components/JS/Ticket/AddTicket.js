import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
import Button from '@mui/material/Button'
import {useState} from "react";
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
    const [open, setOpen] = useState(false)
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
        props.setAddTicket(formValues)
        setOpen(false)

    };
    return (
        <>
             <Tooltip title="Submit comment">
                <IconButton onClick={handleClickOpen}>
                    <AddCircleIcon/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>

                <DialogTitle sx={{pl: 4.6}}>Submit new ticket</DialogTitle>
                <DialogContent>

                    <Box p={2}>
                        {/*<form*/}
                        <Box pb={3} >
                            <TextField
                                fullWidth
                                id="standard-multiline-static"
                                variant="standard"
                                name="title"
                                label="Ticket title"
                                type="text"
                                multiline
                                maxRows={4}
                                value={formValues.title}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box pb={5} >
                            <TextField
                                fullWidth
                                id="standard-multiline-static"
                                variant="standard"
                                name="description"
                                label="Ticket description"
                                type="text"
                                multiline
                                maxRows={4}
                                value={formValues.description}
                                onChange={handleInputChange}

                            />

                        </Box>

                        <Box pb={3}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Ticket priority</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name="priority"
                                    value={formValues.priority}
                                    label="Priority"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem key="Low" value="Low">Low</MenuItem>
                                    <MenuItem key="Medium" value="Medium">Medium</MenuItem>
                                    <MenuItem key="High" value="High">High</MenuItem>
                                    <MenuItem key="Urgent" value="Urgent">Urgent</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box pb={3}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Ticket type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name="type"
                                    value={formValues.type}
                                    label="Type"
                                    onChange={handleInputChange}
                                    defaultValue="Not specified"
                                >
                                    <MenuItem key={uuidv4()} value="Bug report">Bug report</MenuItem>
                                    <MenuItem key={uuidv4()} value="Feature request">Feature request</MenuItem>
                                    <MenuItem key={uuidv4()} value="Other">Other</MenuItem>
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