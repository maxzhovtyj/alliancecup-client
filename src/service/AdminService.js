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

    static async addFiltrationItem(form) {
        try {
            const res = await $api.post("api/admin/filtration", form).catch(function (error) {
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
                    message: "Фільтрацію успішно додано"
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

    static async deleteFiltrationItem(id) {
        try {
            const res = await $api.delete(`api/admin/filtration?id=${id}`).catch(function (error) {
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

            if (res?.status === 200) {
                return {message: "Фільтрацію успішно видалено", status: 200}
            } else {
                return {
                    message: "Щось пішло не так"
                }
            }
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