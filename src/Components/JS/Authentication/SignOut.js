import {useEffect, useState} from "react";
import SignIn from "./SignIn";
import Button from "@mui/material/Button";
import {Alert, Grid} from "@mui/material";

export default function SignOut() {
    const [open, setOpen] = useState(true)
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: {}
        }
        fetch('http://127.0.0.1:8000/api/logout/', requestOptions)
    },[])


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"

        >
            <Grid item
                  sx={{width: 425}}
            >
                {open
                    ? <Alert
                        severity="success"
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                x
                            </Button>
                        }
                    >
                        You have been succesfully signed out

                    </Alert>
                    : null}
            </Grid>

            <Grid item>
                <SignIn/>
            </Grid>

        </Grid>
    )
}