import classes from "../../../../UI/dialogs/authDialogs/authDialogs.module.scss";
import {AllianceTextField} from "../../../../UI/styles";
import {TextMaskCustom} from "../../../../utils/TextMask";
import {FormControl} from "@mui/material";
import {UserService} from "../../../../service/UserService";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {useState} from "react";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import AllianceSnackbar from "../../../../UI/snackbar";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

function AdminNewModeratorComponent() {
    const snackbar = useSnackbar()

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const [disabledBtn, setDisabledBtn] = useState(false)

    const [signUpForm, setSignUpForm] = useState({
        email: "",
        lastname: "",
        firstname: "",
        middleName: "",
        phoneNumber: "+38 (012) 123-12-12",
        password: "",
        repeatPassword: "",
    })

    const [signUpErrors, setSignUpErrors] = useState({
        email: false,
        lastname: false,
        firstname: false,
        middleName: false,
        phoneNumber: false,
        password: false,
        repeatPassword: false,
    })

    function signUpFormHandler(e) {
        setSignUpForm({...signUpForm, [e.target.name]: e.target.value})
        setShowDialog(true)
    }

    function signUp() {
        if (!UserService.validateSignUp(signUpForm, setSignUpErrors)) {
            snackbar.setMessage("Поля не пройшли ваділацію")
            snackbar.handleClick()
            return
        }

        const reqForm = {
            email: signUpForm.email,
            password: signUpForm.password,
            phoneNumber: signUpForm.phoneNumber,
            lastname: signUpForm.lastname,
            firstname: signUpForm.firstname,
            middleName: signUpForm.middleName,
        }

        setDisabledBtn(true)
        UserService.signUp(reqForm).then(res => {
            if (res.status === 201 || res.status === 200) {
                snackbar.setMessage("Користувача успішно створено")
                snackbar.handleClick()
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
            setDisabledBtn(false)
        })
    }

    return (
        <div>
            <RouterDialog
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />

            <h1>Створення нового модератора</h1>

            <FormControl className={classes.formInput}>
                <AllianceTextField
                    value={signUpForm.phoneNumber}
                    onChange={signUpFormHandler}
                    name="phoneNumber"
                    id="phone-id"
                    InputProps={{
                        inputComponent: TextMaskCustom
                    }}
                    required
                    label="Номер телефону"
                    error={signUpErrors.phone}
                />
                <AllianceTextField
                    className={classes.formInput}
                    name={"email"}
                    onChange={signUpFormHandler}
                    required
                    label="Email"
                    error={signUpErrors.email}
                />
                <AllianceTextField
                    className={classes.formInput}
                    name={"lastname"}
                    onChange={signUpFormHandler}
                    required
                    label="Прізвище"
                    error={signUpErrors.lastname}
                />
                <AllianceTextField
                    className={classes.formInput}
                    name={"firstname"}
                    onChange={signUpFormHandler}
                    required
                    label="Ім'я"
                    error={signUpErrors.firstname}
                />
                <AllianceTextField
                    className={classes.formInput}
                    name={"middleName"}
                    onChange={signUpFormHandler}
                    required
                    label="По-батькові"
                    error={signUpErrors.middleName}
                />
                <div className={classes.passwordInputs}>
                    <AllianceTextField
                        name={"password"}
                        onChange={signUpFormHandler}
                        required
                        label="Пароль"
                        type={"password"}
                        error={signUpErrors.password}
                    />
                    <AllianceTextField
                        name={"repeatPassword"}
                        onChange={signUpFormHandler}
                        required
                        label="Повторіть пароль"
                        type={"password"}
                        error={signUpErrors.repeatPassword}
                    />
                </div>
            </FormControl>

            <AllianceButton onClick={signUp} disabled={disabledBtn} mt={"1rem"} mb={"1rem"}>Зареєструвати
                модератора</AllianceButton>

            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>
        </div>
    );
}

export default AdminNewModeratorComponent;