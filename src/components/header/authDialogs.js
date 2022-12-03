import {useContext, useState} from "react";

import classes from '../../UI/dialogs/authDialogs/authDialogs.module.scss'
import enter from "../../assets/svgs/log-in.svg";

import SignUpDialog from "../../UI/dialogs/authDialogs/signUpDialog";
import SignInDialog from "../../UI/dialogs/authDialogs/signInDialog";
import {useSnackbar} from "../../hooks/useSnackbar";
import AllianceSnackbar from "../../UI/snackbar";
import {AuthContext} from "../../context/AuthContext";
import {UserService} from "../../service/UserService";

export default function AuthDialogs() {
    const {isAuth, login} = useContext(AuthContext)

    let {open, message, setMessage, handleClose, handleClick} = useSnackbar()

    const [signInForm, setSignInForm] = useState({email: "", password: ""})
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        lastname: "",
        firstname: "",
        middleName: "",
        phoneNumber: "+38 (012) 123-12-12",
        password: "",
        repeatPassword: "",
    })

    const [signInErrors, setSignInErrors] = useState({
        email: false,
        password: false
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

    const [signInOpen, setSignInOpen] = useState(false)
    const [signUpOpen, setSignUpOpen] = useState(false)

    const handleSignInOpen = () => {
        setSignUpOpen(false)
        setSignInOpen(true);
    };

    const handleSignInClose = () => {
        setSignInOpen(false);
    };

    const handleSignUpOpen = () => {
        setSignInOpen(false)
        setSignUpOpen(true);
    };

    const handleSignUpClose = () => {
        setSignUpOpen(false);
    };

    function signInFormHandler(e) {
        setSignInForm({...signInForm, [e.target.name]: e.target.value})
    }

    function signUpFormHandler(e) {
        setSignUpForm({...signUpForm, [e.target.name]: e.target.value})
    }

    function signIn() {
        if (!UserService.validateSignIn(signInForm, setSignInErrors)) {
            setMessage("Поля не пройшли ваділацію")
            handleClick()
            return
        }

        UserService.signIn(signInForm).then(res => {
            if (res.status === 200) {
                localStorage.clear()
                login(res.data.accessToken, res.data.userId, res.data.userRoleCode)
                handleSignUpClose()
            } else {
                setMessage(res?.message)
                handleClick()
            }
        })
    }

    function signUp() {
        if (!UserService.validateSignUp(signUpForm, setSignUpErrors)) {
            setMessage("Поля не пройшли ваділацію")
            handleClick()
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

        UserService.signUp(reqForm).then(res => {
            if (res.status === 201 || res.status === 200) {
                handleSignUpClose()
                handleSignInOpen()
            } else {
                setMessage(res?.message)
                handleClick()
            }
        })
    }

    return (
        <>
            <div className={classes.authBtn} onClick={handleSignInOpen}>
                {
                    !isAuth
                        ?
                        <div className={classes.authTop}>
                            <img src={enter} alt="login"/>
                            <span>Авторизація</span>
                        </div>
                        : ""
                }
            </div>

            <SignInDialog
                signInOpen={signInOpen}
                handleSignInOpen={handleSignInOpen}
                handleSignInClose={handleSignInClose}
                signInFormHandler={signInFormHandler}
                signIn={signIn}
                handleSignUpOpen={handleSignUpOpen}
                errors={signInErrors}
            />

            <SignUpDialog
                signUpOpen={signUpOpen}
                handleSignUpOpen={handleSignUpOpen}
                handleSignUpClose={handleSignUpClose}
                signUpFormHandler={signUpFormHandler}
                signUp={signUp}
                handleSignInOpen={handleSignInOpen}
                value={signUpForm}
                errors={signUpErrors}
            />

            <AllianceSnackbar open={open} message={message} handleClose={handleClose}/>
        </>
    );
}