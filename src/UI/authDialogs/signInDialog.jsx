import React from 'react';
import classes from "./authDialogs.module.scss";
import {IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

function SignInDialog({signInOpen, handleSignInOpen, handleSignInClose, signInFormHandler, signIn, handleSignUpOpen}) {
    return (
        <Dialog open={signInOpen} onClose={handleSignInOpen}>
            <div className={classes.dialogWrapper}>
                <div className={classes.topWrapper}>
                    <p className={classes.topTitle}>Авторизація</p>
                    <IconButton
                        aria-label="close"
                        onClick={handleSignInClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
                <DialogContent className={classes.authInputs}>
                    <TextField
                        className={classes.formInput}
                        name={"email"}
                        onChange={signInFormHandler}
                        required
                        label="Email"
                    />
                    <TextField
                        className={classes.formInput}
                        name={"password"}
                        onChange={signInFormHandler}
                        required
                        label="Пароль"
                        type={"password"}
                    />
                </DialogContent>

                <div className={classes.requestBtn}>
                    <Button onClick={signIn} variant={"outlined"} size={"large"}>Увійти</Button>
                </div>

                <div className={classes.redirect}>
                    <p>Немає акаунта?</p>
                    <Button onClick={handleSignUpOpen}>Зареєструватись</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default SignInDialog;