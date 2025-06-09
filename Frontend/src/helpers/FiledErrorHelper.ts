export const FieldErrorHelper = () => {
    const getFieldError = (errors: any, fieldName: string | undefined): string | undefined => {
        if (!fieldName) return;
        return fieldName.split('.').reduce((acc, key) => acc?.[key], errors)?.message;
    };
    return { getFieldError }
}