import {FormControl} from "@mui/material";
import {AllianceTextField} from "../../../UI/styles";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSnackbar} from "../../../hooks/useSnackbar";
import AllianceSnackbar from "../../../UI/snackbar";
import {UserService} from "../../../service/UserService";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";

import classes from "./restorePassword.module.scss"

function RestorePasswordComponent() {
    const snackbar = useSnackbar()

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
        let tmp = {}

        tmp.password = passwordForm.password < 4 || passwordForm.password !== passwordForm.repeatPassword
        tmp.repeatPassword = passwordForm.repeatPassword < 4 || passwordForm.password !== passwordForm.repeatPassword

        // TODO
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

        UserService.restorePassword(passwordForm).then(res => {
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

            <AllianceSnackbar open={snackbar.open} handleClose={snackbar.handleClose} message={snackbar.message}/>
        </div>
    );
}

export default RestorePasswordComponent;