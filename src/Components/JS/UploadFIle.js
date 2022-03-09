import FileUpload from 'react-material-file-upload';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import Button from "@mui/material/Button";

export default function UploadFile(props) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Upload attachment
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>

                <Box>
                    <FileUpload value={props.files} onChange={props.setFiles}/>
                </Box>

            </Dialog>
        </>

    )
}