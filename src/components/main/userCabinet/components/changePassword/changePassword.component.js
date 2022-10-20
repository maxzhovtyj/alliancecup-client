import React, {useState} from 'react';
import {useSnackbar} from "../../../../../hooks/useSnackbar";

import {AuthService} from "../../../../../service/AuthService";

import {AllianceTextField} from "../../../../../UI/styles";

import classes from './changePassword.module.scss'
import AllianceSnackbar from "../../../../../UI/snackbar";
import AllianceButton from "../../../../../UI/allianceCupButton/allianceButton";

function ChangePasswordComponent(props) {
    const [errors, setErrors] = useState({
        oldPassword: false,
        newPassword: false,
        repeatNewPassword: false
    })
    const [form, setForm] = useState({
        "oldPassword": "",
        "newPassword": "",
        "repeatNewPassword": "",
    })

    const {handleClick, setMessage, handleClose, open, message} = useSnackbar()

    const handleForm = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const validate = () => {
        let tmp = {}

        tmp.oldPassword = !form.oldPassword
        tmp.newPassword = form.newPassword < 4 || form.newPassword !== form.repeatNewPassword
        tmp.repeatNewPassword = form.repeatNewPassword < 4 || form.newPassword !== form.repeatNewPassword

        setErrors({
            ...tmp
        })
        return Object.values(tmp).every(value => value === false)
    }

    const changePassword = () => {
        const changePasswordForm = {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword
        }

        if (!validate()) {
            setMessage("Поля не пройшли перевірку")
            handleClick()
            return
        }

        AuthService.changePassword(changePasswordForm).then(res => {
            setMessage(res.message)
            handleClick()
        })
    }


    return (
        <div className={classes.changePasswordWrapper}>
            <div>
                <AllianceTextField
                    fullWidth
                    label={"Поточний пароль"}
                    name={"oldPassword"}
                    type={"password"}
                    value={form.oldPassword}
                    onChange={handleForm}
                    error={errors.oldPassword}
                />

                <div className={classes.passwordFields}>
                    <AllianceTextField
                        label={"Новий пароль"}
                        name={"newPassword"}
                        type={"password"}
                        value={form.newPassword}
                        onChange={handleForm}
                        error={errors.newPassword}
                    />

                    <AllianceTextField
                        label={"Повторіть новий пароль"}
                        name={"repeatNewPassword"}
                        type={"password"}
                        value={form.repeatNewPassword}
                        onChange={handleForm}
                        error={errors.repeatNewPassword}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem"}}>
                    <AllianceButton onClick={changePassword} mt={"1rem"}>
                        Зберегти
                    </AllianceButton>
                </div>
            </div>
            <AllianceSnackbar open={open} message={message} handleClose={handleClose}/>
        </div>
    );
}

export default ChangePasswordComponent;