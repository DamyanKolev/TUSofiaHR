import { FormFieldState } from "@models/FormStates/FormState";
import { ValueState } from "@ui5/webcomponents-react";


export function getNewFormStateFromNestedForms<T extends object>(formState: T, name: string, fieldState: FormFieldState): T {
    let newFormState: T = formState
    Object.entries(formState).forEach(([key, objectValue]) => {
        const fieldType = typeof objectValue
        if(fieldType == "object"){
            if (objectValue.hasOwnProperty(name)) {
                const newObject = {...objectValue, [name]: fieldState}
                newFormState = {...formState, [key]: newObject}
                
            }
        }
    })
    return newFormState
}


export function getNewFormState<T extends object>(formState: T, name: string, fieldState: FormFieldState): T {
    let newFormState = formState
    if (formState.hasOwnProperty(name)) {
        newFormState = { ...formState, [name]: fieldState}
    }
    else {
        newFormState = getNewFormStateFromNestedForms(formState, name, fieldState)
    }

    return newFormState
}


export function setFormValueState<T>(formState: T, setFormState: (formState: T) => void, valueState: ValueState): void {
    let currentState = formState
    let key: keyof typeof formState
    for (key in formState) {
        const fieldState = formState[key] as FormFieldState

        if (!fieldState.isFilled) {
            currentState = { ...currentState, [key]: { ...fieldState, "valueState": valueState } }
        }
    }
    setFormState(currentState);
};


export function setErrorInputStates<T>(formState: T, setFormState: (formState: T) => void): void {
    setFormValueState<T>(formState, setFormState, ValueState.Error);
    setTimeout(() => {
        setFormValueState<T>(formState, setFormState, ValueState.None);
    }, 1000);
}