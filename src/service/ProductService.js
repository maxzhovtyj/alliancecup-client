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

    static async getProducts(id, createdAt, price, characteristic, search, isActive) {
        try {
            createdAt = (createdAt) ? createdAt : ""
            price = (price) ? `${price[0]}:${price[1]}` : ""
            characteristic = (characteristic) ? characteristic : ""
            search = (search) ? search : ""
            isActive = (isActive) ? isActive : ""

            const reqUrl = `/api/products?category=${id}&createdAt=${createdAt}&priceRange=${price}&characteristic=${characteristic}&search=${search}&isActive=${isActive}`

            return await $api.get(reqUrl)
                .catch(function (error) {
                    if (error.response.status === 400) {
                        throw new Error("Помилка: Хибні дані")
                    }
                    if (error.response.status === 500) {
                        throw new Error("Помилка: щось пішло не так")
                    }
                })
        } catch (e) {
            return e
        }
    }

    static async getProduct(id) {
        try {
            return await $api.get(`api/product?id=${id}`)
                .catch(function (error) {
                    if (error.response.status === 500) {
                        throw new Error("Помилка: щось пішло не так")
                    }
                })
        } catch (e) {
            return e
        }
    }

    static async productVisibility(id, isActive) {
        try {
            return await $api.put(`api/admin/product-visibility`, {id, isActive})
                .catch(function (error) {
                    if (error.response.status === 403) {
                        throw new Error("Помилка: У вас немає доступу")
                    }
                    if (error.response.status === 500) {
                        throw new Error("Помилка: щось пішло не так")
                    }
                })
        } catch (e) {
            return e
        }
    }
}