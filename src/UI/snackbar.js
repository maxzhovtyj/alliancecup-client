import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({message, handleClose, open}) {
    const action = (
        <React.Fragment>
            <IconButton
                size="large"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            sx={{minWidth: "500px"}}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={`${message}`}
            action={action}
        />
    );
}