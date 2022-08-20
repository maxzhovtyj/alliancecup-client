import axios from 'axios'

import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

export const API_URL = `http://localhost:8000`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(async (config) => {
    let userData = JSON.parse(localStorage.getItem("userData"))

    if (!userData || userData?.token === "") return config

    config.headers.Authorization = `Bearer ${userData.token}`

    const user = jwtDecode(userData?.token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return config

    const response = await axios.post(`${API_URL}/auth/refresh`, {}, {withCredentials: true})
    localStorage.setItem("userData", JSON.stringify({token: response?.data?.access_token}))

    userData = JSON.parse(localStorage.getItem("userData"))
    if (userData && userData.token !== "") {
        config.headers.Authorization = `Bearer ${userData.token}`
    }

    return config
})

$api.interceptors.response.use()

export default $api