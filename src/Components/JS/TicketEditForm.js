import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {useState} from "react";
import {InputLabel} from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
        priority: ""
    }
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
        props.setTicketEditInfo(formValues)
        setOpen(false)

    };
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit ticket
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
                <DialogTitle>Edit ticket information</DialogTitle>
                <DialogContent>

                    <Box p={2}>
                        {/*<form*/}
                        <Box pb={3} width={3 / 4}>
                            <TextField
                                id="title-input"
                                name="title"
                                label="Ticket title"
                                type="text"
                                value={formValues.title}
                                onChange={handleInputChange}


                            />
                        </Box>
                        <Box pb={5} width={3 / 4}>
                            <TextField
                                id="description-input"
                                name="description"
                                label="Ticket description"
                                type="text"
                                value={formValues.description}
                                onChange={handleInputChange}

                            />
                        </Box>

                        <Box pb={3} width={3 / 4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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