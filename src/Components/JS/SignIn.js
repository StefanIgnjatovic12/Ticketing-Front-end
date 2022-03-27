import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAuth} from "./CurrentUserContext"
import {useState} from "react";
import {Alert, AlertTitle} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();


export default function SignIn() {
    const navigate = useNavigate();
    const [failedLogin, setFailedLogin] = useState(false)
    const [successfulLogin, setSuccessfulLogin] = useState(false)
    const {fetchCurrentUser} = useAuth()

    const handleRedirect = () => {
        if (successfulLogin){
            console.log(successfulLogin)
            navigate("/manage")
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credentials = btoa(`${data.get('username')}:${data.get('password')}`);

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
        fetch('http://127.0.0.1:8000/api/login/', requestOptions)
            .then(response => {
                if (response.status === 401) {
                    setFailedLogin(true)
                }
                return response.json()
            })
            .then(data => {
                setSuccessfulLogin(true)
                localStorage.setItem('token', data['token'])
            })
            .then(fetchCurrentUser)
            .catch(error => console.log(error))

    }

    // fetch("some-url")
    // .then(function(response)
    //  {
    //   if(response.status!==200)
    //    {
    //       throw new Error(response.status)
    //    }
    //  })
    // .catch(function(error)
    // {
    //   ///if status code 401...
    // });
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
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
                            : null
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}