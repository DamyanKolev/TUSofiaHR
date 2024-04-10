import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";


export interface PDataFormState extends FormState {
    identityText: FormFieldState
}

export const defaultPDataInsertFormState: PDataFormState = {
    identityText: defaultInsertFieldState,
}

export const defaultPDataUpdateFormState: PDataFormState = {
    identityText: defaultUpdateFieldState,
}
