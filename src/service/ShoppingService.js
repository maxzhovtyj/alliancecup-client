import $api from "../http/http";

export class ShoppingService {
    static async newOrder(makeOrderForm) {
        try {
            const res = await $api.post('/api/shopping/order', makeOrderForm).catch(function (error) {
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

            return res
        } catch (e) {
            return e
        }
    }

    static async addToCart(addToCartProduct) {
        try {
            await $api.post('/api/shopping/cart', addToCartProduct)
                .catch(function (error) {
                    if (error.response.status === 400) {
                        throw new Error("Помилка: Хибні дані")
                    }
                    if (error.response.status === 500) {
                        if (error.response.data.message.includes("duplicate")) {
                            throw new Error("Помилка: товар уже в кошику")
                        }
                        throw new Error("Помилка: щось пішло не так")
                    }
                })
            return {
                message: "Товар додано до кошику"
            }
        } catch (e) {
            return e
        }
    }

    static async deleteFromCart(productId) {
        try {
            await $api.delete(`/api/shopping/cart?id=${productId}`)
                .catch(function (error) {
                    if (error.response.status === 400) {
                        throw new Error("Помилка: Хибні дані")
                    }
                    if (error.response.status === 500) {
                        if (error.response.data.message.includes("duplicate")) {
                            throw new Error("Помилка: товар уже в кошику")
                        }
                        throw new Error("Помилка: щось пішло не так")
                    }
                })
        } catch (e) {
            return e
        }
    }

    static async addToFavourites(product) {
        try {
            await $api.post('/api/shopping/favourites', product)
                .catch(function (error) {
                    if (error.response.status === 400) {
                        throw new Error("Помилка: Хибні дані")
                    }
                    if (error.response.status === 500) {
                        if (error.response.data.message.includes("duplicate")) {
                            throw new Error("Помилка: товар уже в обраному")
                        }
                        throw new Error("Помилка: щось пішло не так")
                    }
                })

            return {
                message: "Товар додано до обраного"
            }
        } catch (e) {
            return e
        }
    }

    static async deleteFromFavourites(productId) {
        try {
            await $api.delete(`/api/shopping/favourites?id=${productId}`)
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

    static async fetchDeliveryTypes() {
        try {
            const response = await $api.get('/api/shopping/order-info-types').catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Помилка: Хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Помилка: щось пішло не так")
                }
            })
            return {
                deliveryTypes: response.data.deliveryTypes,
                paymentTypes: response.data.paymentTypes
            }
        } catch (e) {
            console.log(e.message)
            return (e.message)
        }
    }
}