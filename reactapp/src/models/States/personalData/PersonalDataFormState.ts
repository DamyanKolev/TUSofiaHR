import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";


export interface PDataFormState extends FormState {
    identityText: FormFieldState
    personalEmail: FormFieldState
    workEmail: FormFieldState
}

export const defaultPDataInsertFormState: PDataFormState = {
    identityText: defaultInsertFieldState,
    personalEmail: defaultInsertFieldState,
    workEmail: defaultInsertFieldState
}

export const defaultPDataUpdateFormState: PDataFormState = {
    identityText: defaultUpdateFieldState,
    personalEmail: defaultUpdateFieldState,
    workEmail: defaultUpdateFieldState
}
