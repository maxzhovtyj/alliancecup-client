import {useContext, useState} from "react";

import $api from "../../http/http";

import classes from '../../UI/authDialogs/authDialogs.module.scss'
import enter from "../../assets/svgs/log-in.svg";

import SignUpDialog from "../../UI/authDialogs/signUpDialog";
import SignInDialog from "../../UI/authDialogs/signInDialog";
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

    const validateSignIn = () => {
        let tmp = {}

        tmp.email = !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(signInForm.email)
        tmp.password = !signInForm.password

        setSignInErrors({
            ...tmp
        })
        return Object.values(tmp).every(value => value === false)
    }

    const validateSignUp = () => {
        let tmp = {}

        tmp.lastname = !signUpForm.lastname
        tmp.firstname = !signUpForm.firstname
        tmp.middleName = !signUpForm.middleName
        tmp.email = !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(signUpForm.email)
        tmp.phoneNumber = signUpForm.phoneNumber?.length < 19
        tmp.password = signUpForm.password < 4 || signUpForm.password !== signUpForm.repeatPassword
        tmp.repeatPassword = signUpForm.repeatPassword < 4 || signUpForm.password !== signUpForm.repeatPassword

        setSignUpErrors({
            ...tmp
        })
        return Object.values(tmp).every(value => value === false)
    }

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
        if (!validateSignIn()) {
            setMessage("Поля не пройшли ваділацію")
            handleClick()
            return
        }

        UserService.signIn(signInForm).then(res => {
            if (res.status === 200) {
                localStorage.clear()
                login(res.data.accessToken, res.data.userId, res.data.userRoleId)
                handleSignUpClose()
            } else {
                setMessage(res?.message)
                handleClick()
            }
        })
    }

    function signUp() {
        if (!validateSignUp()) {
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
                setMessage("Користувача успішно зареєстровано")
                handleClick()
            } else {
                setMessage(res.data)
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