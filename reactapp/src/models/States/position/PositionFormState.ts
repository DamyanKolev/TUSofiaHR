import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";

export interface PositionFormState extends FormState{
    positionName: FormFieldState,
    minSalary: FormFieldState
    maxSalary: FormFieldState
}

export const defualtPositionInsertFormState: PositionFormState = {
    positionName: defaultInsertFieldState,
    minSalary: defaultInsertFieldState,
    maxSalary: defaultInsertFieldState
}

export const defualtPositionUpdateFormState: PositionFormState = {
    positionName: defaultUpdateFieldState,
    minSalary: defaultUpdateFieldState,
    maxSalary: defaultUpdateFieldState
}