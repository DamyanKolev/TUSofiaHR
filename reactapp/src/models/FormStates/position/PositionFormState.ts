import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

export interface PositionFormState extends FormState{
    position_name: FormFieldState,
    min_salary: FormFieldState
    max_salary: FormFieldState
}

export const defualtPositionFormState: PositionFormState = {
    position_name: defaultFormFieldState,
    min_salary: defaultFormFieldState,
    max_salary: defaultFormFieldState
}
