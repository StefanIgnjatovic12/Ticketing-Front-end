import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
import Button from '@mui/material/Button'
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";


export default function ProjectEditForm(props) {
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
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.setProjectEditForm(formValues)
        setOpen(false)

    };
    return (
        <>
             <Button variant="outlined" onClick={handleClickOpen}>
                Edit project
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>

                <DialogTitle sx={{pl: 4.6}}>Edit project information</DialogTitle>
                <DialogContent>

                    <Box p={2}>
                        {/*<form*/}
                        <Box pb={3} >
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
                        <Box pb={5} >
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