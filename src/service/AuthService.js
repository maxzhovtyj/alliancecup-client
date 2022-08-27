import $api from "../http/http";

export class AuthService {
    static async signIn(form) {
        try {
            const response = await $api.post('/auth/sign-in', form).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Неправильні дані")
                }
            })
            localStorage.clear()
            return response.data
        } catch (e) {
             return e
        }
    }

    static async changePassword(form) {
        try {
            const response = await $api.put('/api/client/change-password', form).catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Користувача не знайдено")
                }
            })

            return {
                message: "Пароль успішно змінено"
            }
        } catch (e) {
            return e
        }
    }
}