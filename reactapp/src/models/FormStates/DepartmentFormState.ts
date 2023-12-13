import { ValueState } from "@ui5/webcomponents-react";
import { FormFieldState, FormState } from "./FormState";

export interface DepartmentFormState extends FormState {
    departmentName: FormFieldState,
}

export const departmentFormState: DepartmentFormState = {
    departmentName: { isFilled: false, valueState: ValueState.None },
}
