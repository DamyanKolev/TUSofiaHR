import { ValueState } from "@ui5/webcomponents-react";
import { FormFieldState, FormState } from "./FormState";

export interface EmployeeFormState extends FormState{
    firstName: FormFieldState;
    surname: FormFieldState;
    lastName: FormFieldState;
}

export const employeeFormState: EmployeeFormState = {
    "firstName": { isFilled: false, valueState: ValueState.None },
    "surname": { isFilled: false, valueState: ValueState.None },
    "lastName": { isFilled: false, valueState: ValueState.None }
}