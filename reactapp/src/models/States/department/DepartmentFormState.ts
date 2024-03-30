import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";

export interface DepartmentFormState extends FormState {
    departmentName: FormFieldState,
}

export const defaultDepartmentInsertFormState: DepartmentFormState = {
    departmentName: defaultInsertFieldState,
}

export const defaultDepartmentUpdateFormState: DepartmentFormState = {
    departmentName: defaultUpdateFieldState,
}