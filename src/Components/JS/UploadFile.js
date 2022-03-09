import {withStyles} from "@material-ui/core/styles";
import FileUpload from 'react-material-file-upload';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


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
    return (
        <>
            <Tooltip title="Upload attachment">
                <IconButton onClick={handleClickOpen}>
                    <CloudUploadIcon/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
                <Box>
                    <FileUpload value={props.files} onChange={props.setFiles}/>
                </Box>
            </Dialog>
        </>
    )
}

export default withStyles(defaultToolbarStyles, {name: "UploadFile"})(UploadFile);