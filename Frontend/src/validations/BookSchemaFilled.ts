import * as yup from "yup"
export const BookSchemaFilled = () => {
    return yup.object().shape({
        id: yup.string().required(),
        Name: yup.string().required(),
        price: yup.number().required(),
        category: yup.string().required(),
        author: yup.string().required()
    })
}

export type BookSchemaFilledType = yup.InferType<ReturnType<typeof BookSchemaFilled>>