import axios from "axios";
import {API_URL} from "./http";

const $fileApi = axios.create({
    responseType: "arraybuffer",
    withCredentials: true,
    baseURL: API_URL,
})

export default $fileApi