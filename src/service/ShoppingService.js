import $api from "../http/http";

import configData from "../config.json"

export class ShoppingService {
    static getImage(item) {
        if (item?.imgUUID) {
            return `${configData.MINIO_URL}/images/${item?.imgUUID}`
        } else if (item?.imgUrl) {
            return item.imgUrl
        } else return "https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background-750x500.jpg"
    }

    static async newOrder(makeOrderForm, admin = false) {
        const reqUrl = (admin) ? "/api/admin/order" : "/api/shopping/order"

        try {
            return await $api.post(reqUrl, makeOrderForm).catch(function (error) {
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