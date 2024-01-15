import { ValueState } from "@ui5/webcomponents-react";

export interface FormState {};

export interface FormFieldState {
    isFilled: boolean,
    valueState: ValueState
}

export const defaultFormFieldState: FormFieldState = {
    isFilled: false,
    valueState: ValueState.None
}