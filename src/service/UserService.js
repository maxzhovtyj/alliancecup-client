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

    static truncTimestamp (createdAt) {
        createdAt = createdAt.split(/[TZ]/g)
        let dotInd = createdAt[1].indexOf(".")
        createdAt[1] = createdAt[1].slice(0, dotInd)

        return createdAt.join(" ")
    }
}