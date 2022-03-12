import {withStyles} from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";


const defaultToolbarStyles = {
    iconButton: {},
};

function UploadFile(props) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const defaultValues = {
        comment: "",
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
        props.setAddComment(formValues['comment'])
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
                <DialogTitle sx={{pl: 4.6}}>Submit comment</DialogTitle>
                <DialogContent>
                    <Box p={2}>
                        <Box pb={3}>
                            <TextField
                                fullWidth
                                id="standard-multiline-static"
                                variant="standard"
                                name="comment"
                                label="Comment"
                                type="text"
                                multiline
                                maxRows={4}
                                value={formValues.comment}
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

export default withStyles(defaultToolbarStyles, {name: "UploadFile"})(UploadFile);