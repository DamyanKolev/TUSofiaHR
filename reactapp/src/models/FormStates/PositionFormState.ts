import { ValueState } from "@ui5/webcomponents-react";
import { FormFieldState, FormState } from "./FormState";

export interface PositionFormState extends FormState{
    positionName: FormFieldState,
    minSalary: FormFieldState
    maxSalary: FormFieldState
}

export const positionFormState: PositionFormState = {
    positionName: { isFilled: false, valueState: ValueState.None },
    minSalary: { isFilled: false, valueState: ValueState.None },
    maxSalary: { isFilled: false, valueState: ValueState.None }
}
