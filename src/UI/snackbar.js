import {Fragment} from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AllianceSnackbar({message, handleClose, open}) {
    const action = (
        <Fragment>
            <IconButton
                size="large"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Fragment>
    );

    return (
        <Snackbar
            sx={{maxWidth: "300px", width: "100%"}}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={`${message}`}
            action={action}
        />
    );
}
