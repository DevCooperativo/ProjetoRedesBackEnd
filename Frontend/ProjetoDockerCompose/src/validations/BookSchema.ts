import * as yup from "yup"
export const BookSchema = () => {
    return yup.object().shape({
        id: yup.string().nullable(),
        Name: yup.string().required(),
        price: yup.number().required(),
        category: yup.string().required(),
        author: yup.string().required()
    })
}

export type BookSchemaType = yup.InferType<ReturnType<typeof BookSchema>>