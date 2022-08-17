import React from 'react';
import classes from "./authDialogs.module.scss";
import {IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

function SignUpDialog({signUpOpen, handleSignUpOpen, handleSignUpClose, signUpFormHandler, signUp, handleSignInOpen}) {
    return (
        <Dialog open={signUpOpen} onClose={handleSignUpOpen}>
            <div className={classes.dialogWrapper}>
                <div className={classes.topWrapper}>
                    <p className={classes.topTitle}>Реєстрація</p>
                    <IconButton
                        aria-label="close"
                        onClick={handleSignUpClose}
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
                        onChange={signUpFormHandler}
                        required
                        label="Email"
                    />
                    <TextField
                        className={classes.formInput}
                        name={"name"}
                        onChange={signUpFormHandler}
                        required
                        label="Ім'я"
                    />
                    <TextField
                        className={classes.formInput}
                        name={"phone"}
                        onChange={signUpFormHandler}
                        required
                        label="Номер телефону"
                    />
                    <div className={classes.passwordInputs}>
                        <TextField
                            name={"password"}
                            onChange={signUpFormHandler}
                            required
                            label="Пароль"
                            type={"password"}
                        />
                        <TextField
                            name={"repeatPassword"}
                            onChange={signUpFormHandler}
                            required
                            label="Повторіть пароль"
                            type={"password"}
                        />
                    </div>
                </DialogContent>

                <div className={classes.requestBtn}>
                    <Button onClick={signUp} variant={"outlined"} size={"large"}>Зареєструватись</Button>
                </div>

                <div className={classes.redirect}>
                    <p>Маєте акаунт?</p>
                    <Button onClick={handleSignInOpen}>Увійти</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default SignUpDialog;