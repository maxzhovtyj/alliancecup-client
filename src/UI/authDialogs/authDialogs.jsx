import {useState} from "react";

import classes from './authDialogs.module.scss'
import enter from "../../assets/svgs/enter.svg";

import SignUpDialog from "./signUpDialog";
import SignInDialog from "./signInDialog";
import {useSnackbar} from "../../hooks/useSnackbar";
import SimpleSnackbar from "../snackbar";
import $api from "../../http/http";

export default function AuthDialogs() {
    let {open, message, setMessage, handleClose, handleClick} = useSnackbar()
    let isAuth = false

    const [signInForm, setSignInForm] = useState({email: "", password: ""})
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        name: "",
        phone: "",
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
        await $api.post('/auth/sign-in', signInForm).catch(function (error) {
            if (error.response.status === 400) {
                setMessage("Ви ввели хибні дані")
                handleClick()
            }
            if (error.response.status === 500) {
                setMessage("Користувача не знайдено")
                handleClick()
            }
        })

    }

    async function signUp() {
        const reqForm = {
            email: signUpForm.email,
            password: signUpForm.password,
            phone_number: signUpForm.phone,
            name: signUpForm.name
        }
        console.log(reqForm)
        await $api.post('/auth/sign-up', reqForm).catch(function (error) {
            if (error.response.status === 400) {
                setMessage("Ви ввели хибні дані")
                handleClick()
            }
            if (error.response.status === 500) {
                setMessage("Сталася помилка")
                handleClick()
            }
        })
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
            />

            <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
        </>
    );
}