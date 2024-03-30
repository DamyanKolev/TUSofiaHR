import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";

export interface PositionFormState extends FormState{
    positionName: FormFieldState,
    minSalary: FormFieldState
    maxSalary: FormFieldState
}

export const defualtInsertPositionFormState: PositionFormState = {
    positionName: defaultInsertFieldState,
    minSalary: defaultInsertFieldState,
    maxSalary: defaultInsertFieldState
}

export const defualtUpdatePositionFormState: PositionFormState = {
    positionName: defaultUpdateFieldState,
    minSalary: defaultUpdateFieldState,
    maxSalary: defaultUpdateFieldState
}