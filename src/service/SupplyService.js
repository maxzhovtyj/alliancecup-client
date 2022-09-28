import $api from "../http/http";

export class SupplyService {
    static async newSupply(supplyForm, setMessage, handleClick) {
        try {
            await $api.post('/api/admin/supply', supplyForm).catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Помилка: Хибні дані")
                }
                if (error.response.status === 401) {
                    throw new Error("Помилка: ви не авторизовані")
                }
                if (error.response.status === 403) {
                    throw new Error("У вас немає доступу")
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