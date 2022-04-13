import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useState} from "react";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function PasswordReset(props) {
    const [emailSent, setEmailSent] = useState(null)
    const navigate = useNavigate()
    const handleClose = () => {
        props.setPassResetFormOpen(false);
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
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                // 'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formValues)
        }
        fetch('http://127.0.0.1:8000/api/password_reset/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(setEmailSent(true))
            .catch(error => console.log(error))


    };
    return (
        <>

            <Dialog open={props.passResetFormOpen} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
                {emailSent
                    && <Alert
                        severity="success"
                        sx={{width: "80%", ml: 5.5, mt: 1}}
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    props.setPassResetFormOpen(false)
                                    navigate('/signin')
                                }}
                            >
                                x
                            </Button>
                        }
                    >
                        An email with a password reset link has been sent

                    </Alert>
                }
                <DialogTitle sx={{pl: 4.6}}>Enter your email</DialogTitle>
                <DialogContent>
                    <Box p={2}>
                        <Box pb={3}>
                            <TextField
                                fullWidth
                                id="standard-multiline-static"
                                variant="standard"
                                name="email"
                                label="Email"
                                type="text"
                                value={formValues.email}
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