import $api from "../http/http";

export class ProductService {
    static async search(title, setMessage, handleClick) {
        try {
            return await $api.get(`/api/products?search=${title}`).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Помилка: Хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Помилка: щось пішло не так")
                }
            })
        } catch (e) {
            setMessage(e.message)
            handleClick()
        }
    }

}