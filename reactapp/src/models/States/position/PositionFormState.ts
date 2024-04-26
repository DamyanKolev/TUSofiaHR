import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";

export interface PositionFormState extends FormState{
    positionName: FormFieldState,
    sysPositionId: FormFieldState
}

export const defualtPositionInsertFormState: PositionFormState = {
    positionName: defaultInsertFieldState,
    sysPositionId: defaultInsertFieldState,
}

export const defualtPositionUpdateFormState: PositionFormState = {
    positionName: defaultUpdateFieldState,
    sysPositionId: defaultUpdateFieldState,
}