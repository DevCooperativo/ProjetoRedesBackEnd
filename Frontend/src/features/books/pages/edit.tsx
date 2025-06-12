import { FormProvider } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { BookSchemaFilled, type BookSchemaFilledType } from "../../../validations/BookSchemaFilled";
import { Input } from "../../../components/Input";
import { useBookEdit } from "../hooks/useBookEdit";
import { InputTypes } from "../../../components/Input/InputsTypes";
import React from "react";

export const BookEdit = () =>{

    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state.data as BookSchemaFilledType

    const schema = BookSchemaFilled();

    const bookEdit = useBookEdit({schema, defaultValue: data, navigate})

    return (
        <React.Fragment>
            <div>
                <FormProvider {...bookEdit.methods}>
                    <form onSubmit={bookEdit.methods.handleSubmit(bookEdit.handleSubmit, bookEdit.handleError)}>
                        <Input
                            {...bookEdit.methods.register("Name")}
                            inputType={InputTypes.text}
                            label="Nome"
                        />
                        <Input
                            {...bookEdit.methods.register("Author")}
                            inputType={InputTypes.text}
                            label="Autor"
                        />
                        <Input
                            {...bookEdit.methods.register("Price")}
                            inputType={InputTypes.number}
                            label="Preço"
                        />
                        <Input
                            {...bookEdit.methods.register("Category")}
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