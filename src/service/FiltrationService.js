import $api from "../http/http";

export class FiltrationService {
    static async getFiltrationItem(id) {
        try {
            return await $api.get(`/api/admin/filtration-item?id=${id}`)
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
                    status: res?.status,
                    message: "Фільтрацію успішно додано"
                }
            }
        } catch (e) {
            return e
        }
    }

    static async updateFiltrationItem(form) {
        try {
            return await $api.put("api/admin/filtration", form).catch(function (error) {
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

    static async updateFiltrationItemImg(form) {
        try {
            return await $api.put("api/admin/filtration-image", form).catch(function (error) {
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

    static async deleteFiltrationItemImage(id) {
        try {
            return  await $api.delete(`api/admin/filtration-image?id=${id}`).catch(function (error) {
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

}