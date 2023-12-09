import DataType from "@app-types/DataType";
import { ValueState } from "@ui5/webcomponents-react";
import { FormFieldState, FormState } from "@models/FormStates/FormState";


export function formatDate(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const day: string = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function parseValueByType<Type>(
    object: Type,
    fieldName: string,
    value: string,
    type: string
): Type {
    switch (type) {
        case DataType.Number:
            {
                return { ...object, [fieldName]: Number.parseInt(value) }
            }
        case DataType.Float:
            {
                return { ...object, [fieldName]: Number.parseFloat(value) }
            }
        case DataType.String:
            {
                return { ...object, [fieldName]: value };
            }
        case DataType.Date:
            {
                const date = new Date(value)
                return { ...object, [fieldName]: formatDate(date) };
            }
        default:
            {
                throw new Error("Invalid Type");
            }
    }
}



export function isFilledForm<T extends FormState>(
    formState: T,
    setFormState: (formState: T) => void,
): boolean {
    let isFilled: boolean = true;

    const setValueState = (valueState: ValueState): void => {
        let currentState = formState
        let key: keyof typeof formState
        for (key in formState) {
            const fieldState = formState[key] as FormFieldState

            if (!fieldState.isFilled) {
                currentState = { ...currentState, [key]: { ...fieldState, "valueState": valueState } }
                isFilled = false;
            }
        }
        setFormState(currentState);
    };

    if (!isFilled) {
        setValueState(ValueState.Error);
        setTimeout(() => {
            setValueState(ValueState.None);
        }, 1000);
    }

    return isFilled;
}