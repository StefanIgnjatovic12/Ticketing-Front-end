import {withStyles} from "@material-ui/core/styles";
import FileUpload from 'react-material-file-upload';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {DropzoneDialog} from 'react-mui-dropzone'


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

            <DropzoneDialog
                open={open}
                onSave={(files) => {
                    props.setFiles(files)
                    setOpen(false)
                }}
                acceptedFiles={['.txt', '.doc', '.docx', '.xlsx', '.csv', 'image/*']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose}
            />
        </>
    )
}

export default withStyles(defaultToolbarStyles, {name: "UploadFile"})(UploadFile);