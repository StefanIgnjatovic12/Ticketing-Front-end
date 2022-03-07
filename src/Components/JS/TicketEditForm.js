import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {useState} from "react";
import {InputLabel} from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


export default function TicketEditForm(props) {
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
        event.preventDefault();
        props.setTicketEditInfo(formValues)

    };
    return (
        <Paper
            sx={{
                width: 300
            }}
        >
            <Box
                sx={{
                    padding: 3
                }}
                mt={3}
            >
                <form
                    onSubmit={handleSubmit}>

                    <TextField
                        id="title-input"
                        name="title"
                        label="Ticket title"
                        type="text"
                        value={formValues.title}
                        onChange={handleInputChange}

                    />
                    <TextField
                        id="description-input"
                        name="description"
                        label="Ticket description"
                        type="text"
                        value={formValues.description}
                        onChange={handleInputChange}

                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Paper>

    )
}