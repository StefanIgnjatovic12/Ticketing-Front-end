import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";

export default function PasswordResetConf() {
    const [email, setEmail] = useState(null)
    const [passResetSuccessAlert, setPassResetSuccessAlert] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const token = location.pathname.split('/')[2]

    const handleClose = () => {
        navigate('/signin')
    };

    const defaultValues = {
        token: token,
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
        console.log(formValues)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues)
        }
        fetch(`https://drf-react-ticketing-backend.herokuapp.com/api/password_reset/confirm/?token=${token}`, requestOptions)
            .then(response => response.json())
            .then(data =>
                data.status === 'OK' ? setPassResetSuccessAlert(true) : null
            )
            .catch(error => console.log(error))


    };
    return (
        <>
            <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
                {passResetSuccessAlert
                    && <Alert
                        severity="success"
                        sx={{width: "80%", ml: 4, mt: 1}}
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setPassResetSuccessAlert(false)
                                    navigate('/signin')
                                }}
                            >
                                x
                            </Button>
                        }
                    >
                        Your password has reset

                    </Alert>
                            }
                <DialogTitle sx={{pl: 4.6}}>Enter your new password</DialogTitle>
                <DialogContent>
                    <Box p={2}>

                            <Box pb={3}>
                                <TextField
                                    fullWidth
                                    id="standard-password-input"
                                    variant="standard"
                                    name="password"
                                    label="Password"
                                    type="password"
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