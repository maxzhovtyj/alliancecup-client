import $api from "../http/http";

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
            console.log(e)
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

    static truncTimestamp (createdAt) {
        createdAt = createdAt.split(/[TZ]/g)
        let dotInd = createdAt[1].indexOf(".")
        createdAt[1] = createdAt[1].slice(0, dotInd)

        return createdAt.join(" ")
    }
}