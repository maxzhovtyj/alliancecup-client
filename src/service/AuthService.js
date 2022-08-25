import $api from "../http/http";

export class AuthService {
    static async signIn(form) {
        try {
            const response = await $api.post('/auth/sign-in', form).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Користувача не знайдено")
                }
            })
            localStorage.clear()
            return response.data
        } catch (e) {
             return e
        }
    }
}