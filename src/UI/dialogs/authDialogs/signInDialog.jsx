import React from 'react';
import classes from "./authDialogs.module.scss";
import {FormControl, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import {AllianceTextField} from "../../styles";
import AllianceButton from "../../allianceCupButton/allianceButton";

function SignInDialog({
                          signInOpen,
                          handleSignInOpen,
                          handleSignInClose,
                          signInFormHandler,
                          signIn,
                          handleSignUpOpen,
                          handleForgotPasswordOpen,
                          errors
                      }) {
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
                    <FormControl>
                        <AllianceTextField
                            className={classes.formInput}
                            name={"email"}
                            onChange={signInFormHandler}
                            required
                            label="Email"
                            error={errors.email}
                        />
                        <AllianceTextField
                            className={classes.formInput}
                            name={"password"}
                            onChange={signInFormHandler}
                            required
                            label="Пароль"
                            type={"password"}
                            error={errors.password}
                        />
                    </FormControl>
                </DialogContent>

                <div className={classes.requestBtn}>
                    <AllianceButton onClick={signIn} variant={"outlined"} size={"large"} mt={"1rem"}>Увійти</AllianceButton>
                </div>

                <div className={classes.forgotPassword}>
                    <p onClick={handleForgotPasswordOpen}>Забули пароль?</p>
                </div>

                <div className={classes.redirect}>
                    <p>Немає акаунта?</p>
                    <AllianceButton onClick={handleSignUpOpen} variant={"text"}>Зареєструватись</AllianceButton>
                </div>
            </div>
        </Dialog>
    );
}

export default SignInDialog;