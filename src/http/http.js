import axios from 'axios'

import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import configData from "../config.json"

const $api = axios.create({
    withCredentials: true,
    baseURL: configData.API_URL,
})

export const $fileApi = axios.create({
    responseType: "arraybuffer",
    withCredentials: true,
    baseURL: configData.API_URL,
})

export const storageName = "userData"

$api.interceptors.request.use(async (config) => {
    let userData = JSON.parse(localStorage.getItem(storageName))

    if (!userData || userData?.token === "") return config

    config.headers.Authorization = `Bearer ${userData.token}`

    const user = jwtDecode(userData?.token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return config

    const refreshUrl = `${configData.API_URL}/auth/refresh`
    const response = await axios.post(refreshUrl, {}, {withCredentials: true})
        .catch(function () {
            localStorage.removeItem(storageName)
            window.location.reload()
            return config
        })

    localStorage.setItem(storageName, JSON.stringify({
        userId: response.data.userId,
        userRoleCode: response.data.userRoleCode,
        token: response.data.accessToken
    }))

    userData = JSON.parse(localStorage.getItem(storageName))
    if (userData && userData.token !== "") {
        config.headers.Authorization = `Bearer ${userData.token}`
    }

    return config
})

$api.interceptors.response.use()

export default $api