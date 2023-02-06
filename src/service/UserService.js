import $api, {API_URL} from "../http/http";
import axios from "axios";

export class UserService {
    static async orders() {
        try {
            return await $api.get("/api/client/user-orders").catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async userInfo() {
        try {
            return await $api.get("/api/client/personal-info").catch(function (err) {
                if (err.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (err.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async logout() {
        try {
            await $api.delete('/api/client/logout').catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Помилка: Хибні дані")
                }
                if (error.response.status === 401) {
                    throw new Error("Помилка: ви не авторизовані")
                }
                if (error.response.status === 500) {
                    throw new Error("Помилка: щось пішло не так")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async forgotPassword(form) {
        try {
            const response = await $api.post('/api/forgot-password', form).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Помилка: Хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Помилка: щось пішло не так")
                }
            })

            if (response.status === 200) {
                return {
                    message: "Інструкції по відновленню були надіслані вам на пошту",
                    status: 200
                }
            }
        } catch (e) {
            return e
        }
    }

    static async restorePassword(form, token) {
        const newPasswordForm = {
            password: form.password
        }

        try {
            const response = await axios.put(
                '/api/client/restore-password',
                newPasswordForm,
                {
                    baseURL: API_URL,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Помилка: Хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Помилка: щось пішло не так")
                }
            })

            if (response.status === 200) {
                return {
                    message: "Пароль успішно змінено",
                    status: 200
                }
            }
        } catch (e) {
            return e
        }
    }

    static async updateUserInfo(changeInfo) {
        try {
            return await $api.put("/api/client/personal-info", changeInfo).catch(function (err) {
                if (err.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (err.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                }
                if (err.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async signUp(reqForm) {
        try {
            return await $api.post('/auth/sign-up', reqForm).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async signIn(reqForm) {
        try {
            return await $api.post('/auth/sign-in', reqForm).catch(function (error) {
                if (error.response.status !== 200) {
                    throw new Error("Ви ввели хибні дані")
                }
            })
        } catch (e) {
            return e
        }
    }

    static truncTimestamp(createdAt) {
        createdAt = createdAt.split(/[TZ]/g)
        let dotInd = createdAt[1].indexOf(".")
        createdAt[1] = createdAt[1].slice(0, dotInd)

        return createdAt.join(" ")
    }

    static validateSignUp(signUpForm, setSignUpErrors) {
        let tmp = {}

        tmp.lastname = !signUpForm.lastname
        tmp.firstname = !signUpForm.firstname
        tmp.middleName = !signUpForm.middleName
        tmp.email = !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(signUpForm.email)
        tmp.phoneNumber = signUpForm.phoneNumber?.length < 19
        tmp.password = signUpForm.password < 4 || signUpForm.password !== signUpForm.repeatPassword
        tmp.repeatPassword = signUpForm.repeatPassword < 4 || signUpForm.password !== signUpForm.repeatPassword

        setSignUpErrors({
            ...tmp
        })
        return Object.values(tmp).every(value => value === false)
    }

    static validateSignIn(signInForm, setSignInErrors) {
        let tmp = {}

        tmp.email = !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(signInForm.email)
        tmp.password = !signInForm.password

        setSignInErrors({
            ...tmp
        })

        return Object.values(tmp).every(value => value === false)
    }

    static validateForgotPassword(forgotPasswordForm, setForgotPasswordErrors) {
        let tmp = {}

        tmp.email = !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(forgotPasswordForm.email)

        setForgotPasswordErrors({
            ...tmp
        })

        return Object.values(tmp).every(value => value === false)
    }
}