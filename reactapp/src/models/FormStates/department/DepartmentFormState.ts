import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

export interface DepartmentFormState extends FormState {
    departmentName: FormFieldState,
}

export const defaultDepartmentFormState: DepartmentFormState = {
    departmentName: defaultFormFieldState,
}
