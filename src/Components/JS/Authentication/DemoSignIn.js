import {useState} from "react";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from "@mui/material/Link";
import {useAuth} from "../UserManagement/CurrentUserContext";
import {useNavigate} from "react-router-dom";


export default function DemoSignIn() {
    const [open, setOpen] = useState(false)
    const {fetchCurrentUser} = useAuth()
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        let credentials
        if (e.target.name === 'admin') {
            credentials = btoa('Demo_Admin')
        } else if (e.target.name === 'developer') {
            credentials = btoa('Demo_Dev')
        } else if (e.target.name === 'user') {
            credentials = btoa('Demo_User')
        }
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Basic ${credentials}`
            },
            body: JSON.stringify({})

        }
        fetch('https://drf-react-chat-backend.herokuapp.com/api/login/', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data['token'])
                return fetchCurrentUser()
            })
            .then(() => {
                navigate('/maindash')

            })
            .catch(error => console.log(error))
    }
    // const credentials = btoa(`${data.get('username')}:${data.get('password')}`);


    return (
        <>
            <Link variant="body2" onClick={handleClickOpen} sx={{cursor: "pointer"}}>
                Sign in as demo user
            </Link>

            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>

                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <DialogTitle>Click below to sign in with a demo account</DialogTitle>
                </Box>

                <DialogContent>

                    <Box p={2} sx={{display: "flex", direction: "row", justifyContent: "space-evenly"}}>


                        <Box
                            name="admin"
                            onClick={handleSubmit}
                            component="img"
                            sx={{
                                mr: 2,
                                height: "30%",
                                width: "30%",
                                cursor: "pointer"
                            }}
                            src={process.env.PUBLIC_URL + "admin.png"}
                        >
                        </Box>

                        <Box
                            name="developer"
                            onClick={handleSubmit}
                            component="img"
                            sx={{
                                ml: 2,
                                mr: 2,
                                height: "30%",
                                width: "30%",
                                cursor: "pointer"
                            }}
                            src={process.env.PUBLIC_URL + "developer.png"}
                        >
                        </Box>

                        <Box
                            name="user"
                            onClick={handleSubmit}
                            component="img"
                            sx={{
                                ml: 2,
                                height: "31%",
                                width: "31%",
                                cursor: "pointer"
                            }}

                            src={process.env.PUBLIC_URL + "user.png"}
                        >
                        </Box>

                    </Box>
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose}>Cancel</Button>*/}
                {/*    /!*<Button onClick={handleClose}>Subscribe</Button>*!/*/}
                {/*    <Button*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        type="submit"*/}
                {/*        onClick={handleSubmit}*/}
                {/*    >*/}
                {/*        Submit*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </>


    )
}