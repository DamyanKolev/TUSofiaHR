import { FormState, FormFieldState } from "@models/States/FormState";
import { setErrorInputStates } from "./forms/formState";


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


export function isFilledMultipleForms<T extends object>(object: T): boolean{
    let isAllFilled = false
    Object.entries(object).forEach(([, objectValue]) => {
        const fieldType = typeof objectValue
        if(fieldType == "object"){
            const isFilled = isFilledForm(objectValue)
            isAllFilled = isFilled? true : false
        }
    })
    return isAllFilled
}



export function isChangedMultipleForms<T extends object>(object: T): boolean{
    let isAllChaged = false
    Object.entries(object).forEach(([, objectValue]) => {
        const fieldType = typeof objectValue
        if(fieldType == "object"){
            const isChaged = isFormChanged(objectValue)
            isAllChaged = isChaged? true : false
        }
    })
    return isAllChaged
}




export function validateFormAndSetData<T extends object, S>(
    formData: T, formState: S, setState:(formState: S) => void) 
{
    let newFormData: T = formData
    Object.entries(formData).forEach(([key, value]) => {
        const fieldType = typeof value
        if(fieldType == "object"){
            if (isFormChanged(value)){
                if (isFilledForm(value)) {
                    newFormData = {...formData, [key]: null}
                }
                else {
                    setErrorInputStates(value, (newState): void => {setState({...formState, [key]: newState})})
                }
            }
        }
    })
    return newFormData
}