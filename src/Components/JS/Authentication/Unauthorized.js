import {useNavigate} from "react-router-dom"
import {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button'
import Box from "@mui/material/Box";

export default function Unauthorized() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const goBack = () => navigate(-1)

    const handleClose = () => {
        setOpen(false)
        navigate('/maindash')
    }
    return (

        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
            {/*<DialogTitle sx={{fontSize: 50}}>403 - Forbidden</DialogTitle>*/}
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                <Box
                    name="denied"
                    component="img"
                    sx={{
                        mb: 2,
                        height: "50%",
                        width: "50%"
                    }}
                    src={process.env.PUBLIC_URL + "denied.jpg"}
                >
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: 18,
                        mb: 2
                    }}
                >
                    You do not have permission to access this page
                </Typography>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                        handleClose()
                        navigate('/maindash')
                    }}>
                    Go back
                </Button>
            </DialogContent>
        </Dialog>

    )
    {/*<section>*/
    }
    {/*    <h1>Unauthorized</h1>*/
    }
    {/*    <br />*/
    }
    {/*    <p>You do not have access to the requested page.</p>*/
    }
    {/*    <div className="flexGrow">*/
    }
    {/*        <button onClick={navigate('/maindash')}>Go Back</button>*/
    }
    {/*    </div>*/
    }
    {/*</section>*/
    }

}

