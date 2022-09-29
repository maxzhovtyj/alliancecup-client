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
            console.log(response)
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
            return await $api.get(`/api/admin/inventories?createdAt=${createdAt}`).catch(function (error) {
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
            return await $api.get(`/api/admin/inventory-products?id=${id}`).catch(function (error) {
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

}