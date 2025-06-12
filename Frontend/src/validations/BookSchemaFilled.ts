import * as yup from "yup"
export const BookSchemaFilled = () => {
    return yup.object().shape({
        Id: yup.string().required(),
        Name: yup.string().required(),
        Price: yup.number().required(),
        Category: yup.string().required(),
        Author: yup.string().required()
    })
}

export type BookSchemaFilledType = yup.InferType<ReturnType<typeof BookSchemaFilled>>