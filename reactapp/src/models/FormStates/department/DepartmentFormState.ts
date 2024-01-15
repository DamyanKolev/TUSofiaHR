import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

export interface DepartmentFormState extends FormState {
    department_name: FormFieldState,
}

export const defaultDepartmentFormState: DepartmentFormState = {
    department_name: defaultFormFieldState,
}
