import $api from "../http/http";
import {cartProductsStorage} from "../components/main/categories/products/productItem.component";

export class ShoppingService {
    static async newOrder(makeOrderForm, setMessage, handleClick) {
        try {
            await $api.post('/api/new-order', makeOrderForm).catch(function (error) {
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

    static async deleteFromCart(isAuth, productId) {
        if (isAuth) {
            await $api.delete(`/api/client/delete-from-cart?id=${productId}`)
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