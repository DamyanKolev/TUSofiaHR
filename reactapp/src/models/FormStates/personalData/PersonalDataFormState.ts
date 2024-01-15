import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";


export interface PersonalDataFormState extends FormState {
    egn: FormFieldState
}

export const defaultPersonalDataFormState: PersonalDataFormState = {
    egn: defaultFormFieldState,
}