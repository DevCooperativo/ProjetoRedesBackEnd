import { Axios } from "axios"
export const api = new Axios({
    baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/Books`
})