import { forwardRef, type InputHTMLAttributes } from "react";
import type { InputTypesType } from "./InputsTypes";
import { S as Inputs } from "./style";
import { useFormContext } from "react-hook-form";
import { FieldErrorHelper } from "../../helpers/FiledErrorHelper";

export interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
    inputType: InputTypesType
    label: string
}

export const Input = forwardRef<HTMLInputElement, InputsProps>(({ inputType, label, ...rest }, ref) => {
    const context = useFormContext()
    const { name } = rest
    const error = FieldErrorHelper().getFieldError(context.formState.errors, name)
    return (
        <div>
            <p>{label}</p>
            <Inputs.input ref={ref} type={inputType} {...rest} />
            <span className="block text-red-600">{error}</span>
        </div>
    )
})
Input.displayName = "Input"