import {useContext, useState} from "react";

import $api from "../../http/http";

import classes from '../../UI/authDialogs/authDialogs.module.scss'
import enter from "../../assets/svgs/log-in.svg";

import SignUpDialog from "../../UI/authDialogs/signUpDialog";
import SignInDialog from "../../UI/authDialogs/signInDialog";
import {useSnackbar} from "../../hooks/useSnackbar";
import SimpleSnackbar from "../../UI/snackbar";
import {AuthContext} from "../../context/AuthContext";

export default function AuthDialogs() {
    const {isAuth, login} = useContext(AuthContext)

    let {open, message, setMessage, handleClose, handleClick} = useSnackbar()

    const [signInForm, setSignInForm] = useState({email: "", password: ""})
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        name: "",
        phone: "+38 (012) 123-12-12",
        password: "",
        repeatPassword: "",
    })

    const [signInErrors, setSignInErrors] = useState({
        email: false,
        password: false
    })
    const [signUpErrors, setSignUpErrors] = useState({
        email: false,
        name: false,
        phone: false,
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

        tmp.name = !signUpForm.name
        tmp.email = !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(signUpForm.email)
        tmp.phone = signUpForm.phone?.length < 19
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

    async function signIn() {
        if (!validateSignIn()) {
            setMessage("Поля не пройшли ваділацію")
            handleClick()
            return
        }

        try {
            const response = await $api.post('/auth/sign-in', signInForm).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Користувача не знайдено")
                }
            })

            localStorage.clear()
            login(response.data.accessToken, response.data.userId, response.data.userRoleId)
            handleSignUpClose()
        } catch (e) {
            setMessage("Щось пішло не так")
            handleClick()
        }
    }

    async function signUp() {
        if (!validateSignUp()) {
            setMessage("Поля не пройшли ваділацію")
            handleClick()
            return
        }

        const reqForm = {
            email: signUpForm.email,
            password: signUpForm.password,
            phone_number: signUpForm.phone,
            name: signUpForm.name
        }

        try {
            await $api.post('/auth/sign-up', reqForm).catch(function (error) {
                if (error.response.status === 400) {
                    console.log(error)
                    setMessage("Ви ввели хибні дані")
                    handleClick()
                    throw new Error(error.response.message)
                }
                if (error.response.status === 500) {
                    setMessage("Сталася помилка, користувач с такими даними уже існує")
                    handleClick()
                    throw new Error(error.response.message)
                }
            })

            handleSignUpClose()
            handleSignInOpen()
        } catch (e) {
            console.log(e)
        }
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

            <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
        </>
    );
}