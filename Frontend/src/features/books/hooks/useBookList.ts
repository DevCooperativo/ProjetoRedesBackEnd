import { useState } from "react"
import { api } from "../../../config/api"
import type { BookSchemaType } from "../../../validations/BookSchema"

export const useBookList = () => {
    const [data, setData] = useState<BookSchemaType[]>([])
    async function fetchData() {
        try {
            const response = await api.get("/")
            setData(response)
            return response;
        } catch (err) {
            console.log(err)
        }
    }
    return {
        fetchData,
        data
    }
}