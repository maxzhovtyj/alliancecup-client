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

    static async addCategory(form) {
        try {
            return await $api.post("api/admin/category", form).catch(function (error) {
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
        console.log(form)
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
}