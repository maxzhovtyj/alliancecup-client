import {useState} from "react";

import classes from './signIn.module.scss'
import enter from "../../assets/svgs/enter.svg";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialogTitle = (props) => {
    const {children, onClose} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} className={classes.topTitle}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function SignInDialog() {
    // const [form, setForm] = useState({email: "", password: ""})
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
            <>
                <button className={classes.authBtn} onClick={handleClickOpen}>
                    <span><img src={enter} alt="pin"/>Авторизація</span>
                </button>
                <Dialog open={open} onClose={handleClose}>
                    <BootstrapDialogTitle onClose={handleClose}>Авторизація</BootstrapDialogTitle>

                    <DialogContent className={classes.authInputs}>
                        <TextField
                            required
                            id="outlined"
                            label="Email"
                            margin={"normal"}
                        />
                        <TextField
                            required
                            id="outlined"
                            label="Пароль"
                            margin={"normal"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined">Увійти</Button>
                    </DialogActions>
                </Dialog>
            </>
    );
}