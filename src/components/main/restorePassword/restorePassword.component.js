import {useEffect, useState} from "react";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import {UserService} from "../../../service/UserService";

import {FormControl} from "@mui/material";
import {AllianceTextField} from "../../../UI/styles";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";

import classes from "./restorePassword.module.scss"

function RestorePasswordComponent() {
    const snackbar = useSnackbarContext()

    const [queryParams] = useSearchParams()
    const navigate = useNavigate()

    const [passwordForm, setPasswordForm] = useState({password: "", repeatPassword: ""})
    const [passwordFormErrors, setPasswordFormErrors] = useState({password: false, repeatPassword: false})

    useEffect(() => {
        if (queryParams.get("token") === null) {
            navigate("/")
        }
    }, [navigate, queryParams])

    const handleForm = (event) => {
        setPasswordForm({...passwordForm, [event.target.name]: event.target.value})
    }

    const validate = () => {
        let tmp = {
            password: passwordForm.password >= 4 && passwordForm.password === passwordForm.repeatPassword,
            repeatPassword: passwordForm.repeatPassword >= 4 && passwordForm.password === passwordForm.repeatPassword
        }

        setPasswordFormErrors({
            ...tmp
        })

        return Object.values(tmp).every(value => value === false)
    }

    function restorePassword() {
        if (!validate()) {
            snackbar.setMessage("Поля не пройшли валідацію")
            snackbar.handleClick()
            return
        }

        const token = queryParams.get("token")
        if (!token) {
            navigate("/")
        }

        UserService.restorePassword(passwordForm, token).then(res => {
            snackbar.setMessage(res.message)
            snackbar.handleClick()
        })
    }

    return (
        <div className={classes.restorePassword}>
            <h1>Відновлення пароля</h1>

            <FormControl className={classes.restorePasswordForm}>
                <AllianceTextField label={"Пароль"} type={"password"} name={"password"} value={passwordForm.password}
                                   onChange={handleForm}
                                   error={passwordFormErrors.password}/>
                <AllianceTextField label={"Повторіть пароль"} type={"password"} name={"repeatPassword"}
                                   value={passwordForm.repeatPassword} onChange={handleForm}
                                   error={passwordFormErrors.repeatPassword}/>
            </FormControl>

            <AllianceButton onClick={restorePassword} mt={"1rem"} mb={"1rem"}>Відновити пароль</AllianceButton>
        </div>
    );
}

export default RestorePasswordComponent;
