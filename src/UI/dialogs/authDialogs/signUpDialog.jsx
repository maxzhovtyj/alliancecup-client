import React from 'react';
import classes from "./authDialogs.module.scss";
import {FormControl, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

import {TextMaskCustom} from "../../../utils/TextMask";
import {AllianceTextField} from "../../styles";
import AllianceButton from "../../allianceCupButton/allianceButton";

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
                            value={value.phoneNumber}
                            onChange={signUpFormHandler}
                            name="phoneNumber"
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
                            name={"lastname"}
                            onChange={signUpFormHandler}
                            required
                            label="Прізвище"
                            error={errors.lastname}
                        />
                        <AllianceTextField
                            className={classes.formInput}
                            name={"firstname"}
                            onChange={signUpFormHandler}
                            required
                            label="Ім'я"
                            error={errors.firstname}
                        />
                        <AllianceTextField
                            className={classes.formInput}
                            name={"middleName"}
                            onChange={signUpFormHandler}
                            required
                            label="По-батькові"
                            error={errors.middleName}
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
                    <AllianceButton onClick={signUp} variant={"outlined"} mt={"1rem"}
                                    size={"large"}>Зареєструватись</AllianceButton>
                </div>

                <div className={classes.redirect}>
                    <p>Маєте акаунт?</p>
                    <AllianceButton onClick={handleSignInOpen} variant={"text"}>Увійти</AllianceButton>
                </div>
            </div>
        </Dialog>
    );
}

export default SignUpDialog;