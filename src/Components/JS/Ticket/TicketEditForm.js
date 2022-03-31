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
import {getTime} from "../getTime";

export default function TicketEditForm(props) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const defaultValues = {
    //     title: "",
    //     description: "",
    //     priority: ""
    // }
    //changed default state to empty in order to do partial edits
    const [formValues, setFormValues] = useState({})
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
            //add update time which populates field in Ticket model and is after fetched to
            //populate the ticket detail content info
            'update_time': getTime()
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.setTicketEditInfo(formValues)
        setOpen(false)

    };
    return (
        <>
            {/*<a href="#" onClick={handleClickOpen}>Edit ticket</a>*/}
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit ticket
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>

                <DialogTitle sx={{pl: 4.6}}>Edit ticket information</DialogTitle>
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
                                <InputLabel id="demo-simple-select-standard-label">Priority</InputLabel>
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