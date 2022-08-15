import {useContext, useState} from "react";

import classes from './signIn.module.scss'
import enter from "../../assets/svgs/enter.svg";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {AuthContext} from "../../context/AuthContext";
import $api from "../../http/http";
import {useAuth} from "../../hooks/auth.hook";

export default function SignInDialog() {
    const isAuth = useContext(AuthContext)
    let {login} = useAuth()
    const [form, setForm] = useState({email: "", password: ""})
    const [signInOpen, setSignInOpen] = useState(false);

    const handleClickOpen = () => {
        setSignInOpen(true);
    };
    const handleClose = () => {
        setSignInOpen(false);
    };

    function formHandler(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function signIn() {
        const response = await $api.post('/auth/sign-in', form).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
            }
        });
        login(response.data.access_token, 1)
    }

    return (
        <>
            <button className={classes.authBtn} onClick={handleClickOpen}>
                {
                    isAuth ? <span><img src={enter} alt="pin"/>Авторизація</span> : ""
                }
            </button>
            <Dialog open={signInOpen} onClose={handleClose}>
                <div className={classes.dialogWrapper}>
                    <div className={classes.topWrapper}>
                        <p className={classes.topTitle}> Авторизація</p>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <DialogContent className={classes.authInputs}>
                        <TextField
                            name={"email"}
                            onChange={formHandler}
                            className={classes.emailInput}
                            required
                            label="Email"
                        />
                        <TextField
                            name={"password"}
                            onChange={formHandler}
                            required
                            label="Пароль"
                            type={"password"}
                        />
                    </DialogContent>

                    <div className={classes.signInBtn}>
                        <Button onClick={signIn} variant={"outlined"} size={"large"}>Увійти</Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}