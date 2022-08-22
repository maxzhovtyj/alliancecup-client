import {useContext, useState} from "react";

import $api from "../../http/http";

import classes from '../../UI/authDialogs/authDialogs.module.scss'
import enter from "../../assets/svgs/enter.svg";

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

    const [signInOpen, setSignInOpen] = useState(false);
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

    async function signIn() {
        try {
            const response = await $api.post('/auth/sign-in', signInForm).catch(function (error) {
                if (error.response.status === 400) {
                    setMessage("Ви ввели хибні дані")
                    handleClick()
                }
                if (error.response.status === 500) {
                    setMessage("Користувача не знайдено")
                    handleClick()
                }
            })

            console.log(response)
            login(response.data.accessToken, 0)
            handleSignUpClose()
        } catch (e) {
            setMessage("Щось пішло не так")
            handleClick()
        }

    }

    async function signUp() {
        if (signUpForm.password !== signUpForm.repeatPassword) {
            setMessage("Паролі не співпадають")
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
            <button className={classes.authBtn} onClick={handleSignInOpen}>
                {
                    !isAuth ? <span><img src={enter} alt="pin"/>Авторизація</span> : ""
                }
            </button>

            <SignInDialog
                signInOpen={signInOpen}
                handleSignInOpen={handleSignInOpen}
                handleSignInClose={handleSignInClose}
                signInFormHandler={signInFormHandler}
                signIn={signIn}
                handleSignUpOpen={handleSignUpOpen}
            />

            <SignUpDialog
                signUpOpen={signUpOpen}
                handleSignUpOpen={handleSignUpOpen}
                handleSignUpClose={handleSignUpClose}
                signUpFormHandler={signUpFormHandler}
                signUp={signUp}
                handleSignInOpen={handleSignInOpen}
                value={signUpForm}
            />

            <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
        </>
    );
}