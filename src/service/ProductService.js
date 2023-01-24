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

    static async addProduct(form) {
        try {
            return await $api.post("api/admin/product", form).catch(function (error) {
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async updateProduct(product) {
        try {
            return await $api.put("api/admin/product", product).catch(function (error) {
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async updateProductImage(form) {
        try {
            return await $api.put("api/admin/product-image", form).catch(function (error) {
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async deleteProduct(productId) {
        try {
            const response = await $api.delete(`/api/admin/product?id=${productId}`).catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так під час видалення товару")
                }
            })

            return {
                id: JSON.parse(JSON.stringify(response.data.id)),
                message: "Товар успішно видалено"
            }
        } catch (e) {
            return e
        }
    }

    static async deleteProductImage(productId) {
        try {
            return await $api.delete(`/api/admin/product-image?id=${productId}`).catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так під час видалення фотографії товару")
                }
            })
        } catch (e) {
            return e
        }
    }

    static validateCharacteristics(characteristics, setCharacteristicsErr) {
        const resProductChar = []
        const productCharacteristics = {}
        characteristics.forEach(item => {
            resProductChar.push({
                name: !(item.name && !(item.name in productCharacteristics)),
                description: !item.description,
            })
            productCharacteristics[`${item.name}`] = item.description
        })

        setCharacteristicsErr([...resProductChar])

        return resProductChar
            .map(value => Object.values(value).every(el => el === false))
            .every(item => item === true)
    }

    static validatePackaging(packaging, setPackagingErr) {
        const resProductPackaging = []
        const productPackaging = {}
        packaging.forEach(item => {
            resProductPackaging.push({
                type: !(item.type && !(item.type in productPackaging)),
                amount: !item.amount,
            })
            productPackaging[`${item.type}`] = item.amount
        })

        setPackagingErr([...resProductPackaging])

        return resProductPackaging
            .map(value => Object.values(value).every(el => el === false))
            .every(item => item === true)
    }
}