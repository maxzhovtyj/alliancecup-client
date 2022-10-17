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
}