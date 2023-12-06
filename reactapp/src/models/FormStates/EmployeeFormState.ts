import { FormFieldState, FormState } from "./FormState";

export interface EmployeeFormState extends FormState{
    firstName: FormFieldState;
    surname: FormFieldState;
    lastName: FormFieldState;
}