import React from "react"
import { FormProvider } from "react-hook-form"
import { useBookCreate } from "../hooks/useBookCreate"
import { Input } from "../../../components/Input";
import { InputTypes } from "../../../components/Input/InputsTypes";
import { BookSchema, type BookSchemaType } from "../../../validations/BookSchema";

export const BookCreate = () => {
    const schema = BookSchema();
    const defaultValue: BookSchemaType = {
        Name: "",
        price: 0,
        category: "",
        author: ""
    }
    const bookCreate = useBookCreate({schema, defaultValue});
    console.log("a")
    return (
        <React.Fragment>
            <div>
                <FormProvider {...bookCreate.methods}>
                    <form onSubmit={bookCreate.methods.handleSubmit(bookCreate.handleSubmit, bookCreate.handleError)}>
                        <Input
                            {...bookCreate.methods.register("Name")}
                            inputType={InputTypes.text}
                            label="Nome"
                        />
                        <Input
                            {...bookCreate.methods.register("author")}
                            inputType={InputTypes.text}
                            label="Autor"
                        />
                        <Input
                            {...bookCreate.methods.register("price")}
                            inputType={InputTypes.number}
                            label="Preço"
                        />
                        <Input
                            {...bookCreate.methods.register("category")}
                            inputType={InputTypes.text}
                            label="Categoria"
                        />
                        <div className="flex justify-center py-5">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </React.Fragment>)
}