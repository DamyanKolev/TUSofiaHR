import { ValueState } from "@ui5/webcomponents-react";

export interface FormState {};

export interface FormFieldState {
    isFilled: boolean,
    isChanged: boolean,
    valueState: ValueState,

}

export const defaultInsertFieldState: FormFieldState = {
    isFilled: false,
    isChanged: false,
    valueState: ValueState.None,
}

export const defaultUpdateFieldState: FormFieldState = {
    isFilled: true,
    isChanged: false,
    valueState: ValueState.None,
}