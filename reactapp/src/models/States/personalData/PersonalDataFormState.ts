import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";


export interface PDataFormState extends FormState {
    egn: FormFieldState
}

export const defaultPDataInsertFormState: PDataFormState = {
    egn: defaultInsertFieldState,
}

export const defaultPDataUpdateFormState: PDataFormState = {
    egn: defaultUpdateFieldState,
}
