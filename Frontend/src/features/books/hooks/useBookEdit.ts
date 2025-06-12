import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form"
import { type BookSchemaFilledType } from "../../../validations/BookSchemaFilled"
import type { ObjectSchema } from "yup"
import { api } from "../../../config/api"
import type { useNavigate } from "react-router-dom"

export interface useBookEditProps {
    schema: ObjectSchema<BookSchemaFilledType>,
    defaultValue: BookSchemaFilledType,
    navigate: ReturnType<typeof useNavigate>
}

export const useBookEdit = ({ schema, defaultValue, navigate }: useBookEditProps) => {
    const methods = useForm({ defaultValues: defaultValue, resolver: yupResolver(schema) })

    const handleSubmit: SubmitHandler<BookSchemaFilledType> = async (data) => {
        try {
            await api.put(`/${data.Id}`, JSON.stringify(data))
            navigate("/", { replace: true })
        } catch (err) {
            console.log(err)
        }
    }
    const handleError: SubmitErrorHandler<BookSchemaFilledType> = async (data) => {
        console.log(methods.getValues())
        console.log("erro", data)
    }

    return {
        methods,
        handleSubmit,
        handleError
    }
}