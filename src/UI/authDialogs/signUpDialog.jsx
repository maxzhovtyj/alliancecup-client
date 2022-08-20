import React, {forwardRef} from 'react';
import classes from "./authDialogs.module.scss";
import {FormControl, IconButton, Input, InputLabel, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import PropTypes from 'prop-types';
import {IMaskInput} from 'react-imask';
import {muiTextField} from "../styles";

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="+38# (00) 000-00-00"
            definitions={{
                "#": /[0]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function SignUpDialog({
                          signUpOpen,
                          handleSignUpOpen,
                          handleSignUpClose,
                          signUpFormHandler,
                          signUp,
                          handleSignInOpen,
                          value
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
                        <InputLabel htmlFor="phone">Номер телефону</InputLabel>
                        <Input
                            value={value.phone}
                            onChange={signUpFormHandler}
                            name="phone"
                            id="phone"
                            inputComponent={TextMaskCustom}
                            required
                            label="Номер телефону"
                        />
                    </FormControl>
                    <TextField
                        sx={{muiTextField}}
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