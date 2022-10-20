import $api from "../http/http";

export class AdminService {
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

    static async deleteCategory(categoryId) {
        try {
            const response = await $api.delete(`/api/admin/category?id=${categoryId}`).catch(function (error) {
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

            return {
                id: response.data.id,
                message: "Категорію успішно видалено"
            }
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

    static async doInventory(form) {
        try {
            return await $api.post("api/admin/super/inventory", form).catch(function (err) {
                if (err.response.status === 500) {
                    throw new Error("Щось пішло не так...")
                }
                else if (err.response.status === 400) {
                    throw new Error("Ви ввели хибні дані")
                }
                else throw new Error("Щось пішло не так...")
            })
        } catch (e) {
            return e
        }

    }

    static HandleMoney(price) {
        return Number(parseFloat(String(price)).toPrecision(15))
    }
}