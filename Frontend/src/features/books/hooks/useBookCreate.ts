import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form"
import { type BookSchemaType } from "../../../validations/BookSchema"
import type { ObjectSchema } from "yup"
import { api } from "../../../config/api"

export interface useBookCreateProps {
    schema: ObjectSchema<BookSchemaType>,
    defaultValue: BookSchemaType
}

export const useBookCreate = ({ schema, defaultValue }: useBookCreateProps) => {
    const methods = useForm({ defaultValues: defaultValue, resolver: yupResolver(schema) })

    const handleSubmit: SubmitHandler<BookSchemaType> = async (data) => {
        try {
            await api.post("", data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleError: SubmitErrorHandler<BookSchemaType> = async (data) => {
        console.log(methods.getValues())
        console.log("erro", data)
    }

    return {
        methods,
        handleSubmit,
        handleError
    }
}