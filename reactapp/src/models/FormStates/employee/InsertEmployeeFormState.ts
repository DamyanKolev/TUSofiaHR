import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

export interface InsertEmployeeFormState extends FormState{
    first_name: FormFieldState;
    middle_name: FormFieldState;
    surname: FormFieldState;
    email: FormFieldState;
    phone_number: FormFieldState;
    company_employee_id: FormFieldState;
    manager_id: FormFieldState;
    department_id: FormFieldState;
    position_id: FormFieldState;
}

export const defaultInsertEmployeeFormState: InsertEmployeeFormState = {
    first_name: defaultFormFieldState,
    middle_name: defaultFormFieldState,
    surname: defaultFormFieldState,
    email: defaultFormFieldState,
    phone_number: defaultFormFieldState,
    company_employee_id: defaultFormFieldState,
    manager_id: defaultFormFieldState,
    department_id: defaultFormFieldState,
    position_id: defaultFormFieldState,
}