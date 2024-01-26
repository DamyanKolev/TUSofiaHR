import { FormFieldState, FormState } from "@models/FormStates/FormState";

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