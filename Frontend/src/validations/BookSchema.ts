import * as yup from "yup"
export const BookSchema = () => {
    return yup.object().shape({
        Name: yup.string().required(),
        Price: yup.number().required(),
        Category: yup.string().required(),
        Author: yup.string().required()
    })
}

export type BookSchemaType = yup.InferType<ReturnType<typeof BookSchema>>