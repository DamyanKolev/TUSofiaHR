import { ValueState } from "@ui5/webcomponents-react";

export type FormState = {};

export interface FormFieldState {
    isFilled: boolean,
    valueState: ValueState
}