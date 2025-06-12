import { useState } from "react"
import { api } from "../../../config/api"
import type { BookSchemaFilledType } from "../../../validations/BookSchemaFilled"

export const useBookList = () => {
    const [data, setData] = useState<BookSchemaFilledType[]>([])
    async function fetchData() {
        try {
            const response = await api.get("/")
            setData(JSON.parse(response.data))
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