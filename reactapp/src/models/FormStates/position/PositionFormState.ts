import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

export interface PositionFormState extends FormState{
    positionName: FormFieldState,
    minSalary: FormFieldState
    maxSalary: FormFieldState
}

export const defualtPositionFormState: PositionFormState = {
    positionName: defaultFormFieldState,
    minSalary: defaultFormFieldState,
    maxSalary: defaultFormFieldState
}
