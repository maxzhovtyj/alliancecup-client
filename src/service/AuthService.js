import $api from "../http/http";

class AuthService {
    async signUp(body) {
        try {
            if (body.password !== body.repeatPassword) {
                throw Error("Паролі не співпадають")
            }
            return await $api.post("/auth/signUp", body)
        } catch (e) {
            return e
        }
    }
    signIn(body) {
        try {

        } catch (e) {

        }
    }
}