import $api, {$fileApi} from "../http/http";

export class AdminService {
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
                if (error.response.status === 500) {
                    throw new Error("Щось пішло не так під час запиту на сервер")
                }
            })
        } catch (e) {
            return e
        }
    }

    static async saveInventoryProducts(inventory) {
        try {
            return await $api.put(`/api/admin/super/save-inventory`, inventory).catch(function (error) {
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
}