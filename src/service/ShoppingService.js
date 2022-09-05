import $api from "../http/http";

export const favouriteProductsStorage = "favouriteProductsStorage"
export const cartProductsStorage = "cartProducts"

export class ShoppingService {
    static async newOrder(makeOrderForm, setMessage, handleClick) {
        try {
            await $api.post('/api/order', makeOrderForm).catch(function (error) {
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
            setMessage(e.message)
            handleClick()
        }
        localStorage.removeItem("cartProducts")
    }

    static async addToCart(isAuth, addToCartProduct) {
        try {
            if (isAuth) {
                await $api.post('/api/client/cart', addToCartProduct)
                    .catch(function (error) {
                        if (error.response.status === 400) {
                            throw new Error("Помилка: Хибні дані")
                        }
                        if (error.response.status === 401) {
                            throw new Error("Помилка: ви не авторизовані")
                        }
                        if (error.response.status === 500) {
                            if (error.response.data.message.includes("duplicate")) {
                                throw new Error("Помилка: товар уже в кошику")
                            }
                            throw new Error("Помилка: щось пішло не так")
                        }
                    })
            } else {
                let cart = JSON.parse(localStorage.getItem(cartProductsStorage))

                if (cart) {
                    cart?.products.push(addToCartProduct)
                    localStorage.setItem(cartProductsStorage, JSON.stringify({
                        products: cart?.products,
                        sum: cart.sum + addToCartProduct.price_for_quantity
                    }))
                } else {
                    localStorage.setItem(cartProductsStorage, JSON.stringify({
                        products: [addToCartProduct],
                        sum: addToCartProduct.price_for_quantity
                    }))
                }
            }
            return {
                message: "Товар додано до кошику"
            }
        } catch (e) {
            return e
        }
    }

    static async deleteFromCart(isAuth, productId) {
        if (isAuth) {
            await $api.delete(`/api/client/cart?id=${productId}`)
        } else {
            let cart = JSON.parse(localStorage.getItem(cartProductsStorage))
            let productPrice
            let filtered = cart?.products.filter((item, index) => {
                if (item.product_id === productId) {
                    productPrice = item.price_for_quantity
                    return false
                }
                return true
            })

            localStorage.removeItem(cartProductsStorage)
            if (!filtered?.length) return

            localStorage.setItem(cartProductsStorage, JSON.stringify({
                products: filtered,
                sum: Number(parseFloat(String(cart.sum - productPrice)).toPrecision(15))
            }))
        }
    }

    static async addToFavourites(isAuth, product) {
        try {
            if (isAuth) {
                await $api.post('/api/client/favourites', {id: product.id})
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
            } else {
                let favourites = JSON.parse(localStorage.getItem(favouriteProductsStorage))

                if (favourites) {
                    favourites?.products.push(product)
                    localStorage.setItem(favouriteProductsStorage, JSON.stringify({
                        products: favourites?.products,
                    }))
                } else {
                    localStorage.setItem(favouriteProductsStorage, JSON.stringify({
                        products: [product],
                    }))
                }
            }
            return {
                message: "Товар додано до обраного"
            }
        } catch (e) {
            return e
        }
    }

    static async deleteFromFavourites(isAuth, productId) {
        if (isAuth) {
            await $api.delete(`/api/client/favourites?id=${productId}`)
        } else {
            let favourites = JSON.parse(localStorage.getItem(favouriteProductsStorage))
            let filtered = favourites?.products.filter(item => item.id !== productId)

            localStorage.removeItem(favouriteProductsStorage)
            if (!filtered?.length) return

            localStorage.setItem(favouriteProductsStorage, JSON.stringify({
                products: filtered,
            }))
        }
    }

    static async fetchDeliveryTypes() {
        try {
            const response = await $api.get('/api/order-info-types').catch(function (error) {
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
            return(e.message)
        }
    }
}