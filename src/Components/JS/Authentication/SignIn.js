import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAuth} from "../UserManagement/CurrentUserContext"
import {useState} from "react";
import {Alert, AlertTitle} from "@mui/material";
import {useNavigate, useLocation} from 'react-router-dom';
import DemoSignIn from "./DemoSignIn";
import PasswordReset from "./PasswordReset";

const theme = createTheme();


export default function SignIn() {
    const navigate = useNavigate();
    const location = useLocation()
    const user_origin = location.state
    const [failedLogin, setFailedLogin] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(true)
    const [passResetFormOpen, setPassResetFormOpen] = useState(false)
    const {fetchCurrentUser} = useAuth()

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${localStorage.getItem('token')}`
    //         },
    //         body: {}
    //     }
    //     fetch('https://drf-react-chat-backend.herokuapp.com/api/logout/', requestOptions)
    //     }
    // },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credentials = btoa(`${data.get('username')}:${data.get('password')}`);
        const requestOptionsSignIn = {
            method: "POST",
            credentials: 'omit',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                "Authorization": `Basic ${credentials}`
            },
            body: JSON.stringify({})

        }
        fetch('https://drf-react-chat-backend.herokuapp.com/api/login/', requestOptionsSignIn)
            .then(response => {
                console.log(response.json())
                if (response.status === 401) {
                    setFailedLogin(true)
                    return
                }
                return response.json()
            })
            .then(data => {
                localStorage.setItem('token', data['token'])
                return fetchCurrentUser()
            })
            .then(() => {
                navigate('/maindash')
            })
            .catch(error => console.log(error))

    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {passResetFormOpen && <PasswordReset setPassResetFormOpen={setPassResetFormOpen} passResetFormOpen={passResetFormOpen}/>}
                <CssBaseline/>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            // autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container direction="column">
                            <Grid item>
                                <Link onClick={() => setPassResetFormOpen(true)} href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link onClick={()=> navigate('/signup')} variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>

                            <Grid container justifyContent="flex-start">
                                <Grid item>
                                    <DemoSignIn/>
                                </Grid>
                            </Grid>
                        </Grid>
                        {failedLogin
                            ? <Alert
                                severity="error"
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setFailedLogin(false);
                                        }}
                                    >
                                        x
                                    </Button>
                                }

                            >

                                <AlertTitle>Error</AlertTitle>
                                Incorrect credentials, please try again
                            </Alert>
                            : user_origin === 'signup' && registerSuccess
                                ? <Alert
                                severity="success"
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setRegisterSuccess(false);
                                        }}
                                    >
                                        x
                                     </Button>
                                }

                            >

                                <AlertTitle>Success</AlertTitle>
                                You have succesfuly registered, please sign in below
                            </Alert>
                                : null

                        }



                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}