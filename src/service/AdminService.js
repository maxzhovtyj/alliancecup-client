import $api, {$fileApi} from "../http/http";

export class AdminService {
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

    static async addCategory(form) {
        try {
            const res = await $api.post("api/admin/category", form).catch(function (error) {
                if (error?.response?.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error?.response?.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error?.response?.status === 500) {
                    throw new Error("Щось пішло не так")
                }
            })

            if (res?.status === 200 || res?.status === 201) {
                return {
                    status: res?.status,
                    message: "Категорію успішно додано"
                }
            } else {
                return {
                    message: "Щось пішло не так"
                }
            }
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

    static async deleteCategory(categoryId) {
        try {
            return await $api.delete(`/api/admin/category?id=${categoryId}`).catch(function (error) {
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
                    throw new Error("Щось пішло не так під час видалення категорії")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async deleteCategoryImage(categoryId) {
        try {
            return $api.delete(`/api/admin/category-image?id=${categoryId}`).catch(function (error) {
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
                    throw new Error("Щось пішло не так під час видалення фотографії категорії")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async getInventories(createdAt) {
        try {
            return await $api.get(`/api/admin/super/inventories?createdAt=${createdAt}`).catch(function (error) {
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
                    throw new Error("Щось пішло не так")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async getInventoryProducts(id) {
        try {
            return await $api.get(`/api/admin/super/inventory-products?id=${id}`).catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async getProductsToInventory() {
        try {
            return await $api.get(`/api/admin/super/inventory`).catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async saveInventoryProducts(inventory) {
        try {
            return await $api.post(`/api/admin/super/save-inventory`, inventory).catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async getOrders(createdAt, status, search) {
        try {
            return await $api.get(
                `/api/admin/orders?created_at=${createdAt || ""}&order_status=${status || ""}&search=${search || ""}`
            ).catch(function (error) {
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
                    throw new Error("Щось пішло не так...")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async getOrderInfo(id) {
        try {
            return await $api.get(
                `/api/admin/order?id=${id}`
            ).catch(function (error) {
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async processedOrder(orderId) {
        const data = {orderId: orderId}

        try {
            return await $api.put("/api/admin/processed-order", data).catch(function (error) {
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async completeOrder(orderId) {
        const data = {orderId: orderId}

        try {
            return await $api.put("/api/admin/complete-order", data).catch(function (error) {
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 400) {
                    throw new Error("Ви надали хибні дані")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async doInventory(form) {
        try {
            return await $api.post("api/admin/super/inventory", form).catch(function (err) {
                if (err.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                } else if (err.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                } else throw new Error("Щось пішло не так...")
            })
        } catch (e) {
            return e
        }

    }

    static async getInvoice(orderId) {
        try {
            return await $fileApi.get(`/api/invoice?id=${orderId}`)
        } catch (e) {
            console.log(e)
        }
    }

    static async getModerators(createdAt) {
        try {
            return await $api.get(`/api/admin/super/moderator?createdAt=${createdAt}`).catch(function (error) {
                if (error.response.status === 401) {
                    throw new Error("Спочатку увійдіть")
                }
                if (error.response.status === 403) {
                    throw new Error("Доступ заборонено")
                }
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так")
                }
            })
        } catch (e) {
            return e
        }
    }

    static HandleMoney(price) {
        return Number(parseFloat(String(price)).toPrecision(15))
    }
}