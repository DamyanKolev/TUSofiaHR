import { FormState, FormFieldState } from "@models/States/FormState";
import { FormValidation } from "@/types/FormValidation";


export function isFilledCertainField<T extends FormState>(formState: T, fieldName: string): boolean {
    let isFilled: boolean = true;
    let key: keyof typeof formState
    for (key in formState) {
        if (key == fieldName) {
            const fieldState = formState[key] as FormFieldState

            if (!fieldState.isFilled) {
                isFilled = false;
            }
            break
        }
    }

    return isFilled;
}


export function isFilledForm<T extends FormState>(formState: T): boolean {
    let isFilled: boolean = true;
    let key: keyof typeof formState
    for (key in formState) {
        const fieldState = formState[key] as FormFieldState

        if (!fieldState.isFilled) {
            isFilled = false;
        }
    }

    return isFilled;
}


export function isFormChanged<T extends FormState>(formState: T): boolean {
    let isChanged: boolean = false;
    let key: keyof typeof formState
    for (key in formState) {
        const fieldState = formState[key] as FormFieldState

        if (fieldState.isChanged) {
            isChanged = true;
        }
    }
    return isChanged;
}




export function isFilledMultipleInsertForms<T extends object>(formState: T, requiredForms: Array<string> = [""]): boolean{
    let isSubmittable = false

    Object.entries(formState).forEach(([key, stateObject]) => {
        if (requiredForms.includes(key)) {
            if (isFilledForm(stateObject)) {
                isSubmittable = true
            }
            else {
                isSubmittable = false
            }
        }
    })

    return isSubmittable
}



export function isFilledMultipleUpdateForms<T extends object, D>(
    formState: T, formData: D, requiredForms: Array<string> = [""]
): FormValidation<D>{
    let newObject = formData
    let isSubmittable = false

    Object.entries(formState).forEach(([key, stateObject]) => {
        if (isFormChanged(stateObject)){
            if (isFilledForm(stateObject)) {
                isSubmittable = true
            }
            else {
                isSubmittable = false
            }
        }
        else {
            if (requiredForms.includes(key)) {
                isSubmittable = false
            }
            else {
                newObject = {...newObject, [key]: null}
            }
        }
    })

    return {
        isSubmittable,
        object: newObject
    }
}