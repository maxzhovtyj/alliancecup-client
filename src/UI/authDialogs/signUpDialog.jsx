import React from 'react';
import classes from "./authDialogs.module.scss";
import {FormControl, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import {TextMaskCustom} from "../../utils/TextMask";
import {AllianceTextField} from "../styles";

function SignUpDialog({
                          signUpOpen,
                          handleSignUpOpen,
                          handleSignUpClose,
                          signUpFormHandler,
                          signUp,
                          handleSignInOpen,
                          value,
                          errors
                      }) {
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
                    <FormControl className={classes.formInput}>
                        <AllianceTextField
                            value={value.phone}
                            onChange={signUpFormHandler}
                            name="phone"
                            id="phone-id"
                            InputProps={{
                                inputComponent: TextMaskCustom
                            }}
                            required
                            label="Номер телефону"
                            error={errors.phone}
                        />
                        <AllianceTextField
                            className={classes.formInput}
                            name={"email"}
                            onChange={signUpFormHandler}
                            required
                            label="Email"
                            error={errors.email}
                        />
                        <AllianceTextField
                            className={classes.formInput}
                            name={"name"}
                            onChange={signUpFormHandler}
                            required
                            label="Ім'я"
                            error={errors.name}
                        />
                        <div className={classes.passwordInputs}>
                            <AllianceTextField
                                name={"password"}
                                onChange={signUpFormHandler}
                                required
                                label="Пароль"
                                type={"password"}
                                error={errors.password}
                            />
                            <AllianceTextField
                                name={"repeatPassword"}
                                onChange={signUpFormHandler}
                                required
                                label="Повторіть пароль"
                                type={"password"}
                                error={errors.repeatPassword}
                            />
                        </div>
                    </FormControl>
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