import $api from "../http/http";

export class CategoryService {
    static async getCategory(id) {
        try {
            return await $api.get(`/api/category?id=${id}`)
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

    static async updateCategory(form) {
        try {
            return await $api.put('/api/admin/category', form)
                .catch(function (error) {
                    if (error.response.status === 400) {
                        throw new Error("Помилка: Хибні дані")
                    }
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

    static async updateCategoryImage(form) {
        try {
            return await $api.put('/api/admin/category-image', form)
                .catch(function (error) {
                    if (error.response.status === 400) {
                        throw new Error("Помилка: Хибні дані")
                    }
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

}