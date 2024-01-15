import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

export interface UpdateEmployeeFormState extends FormState{
    first_name: FormFieldState;
    middle_name: FormFieldState;
    surname: FormFieldState;
    email: FormFieldState;
    phone_number: FormFieldState
    manager_id: FormFieldState;
    department_id: FormFieldState;
    position_id: FormFieldState;
}

export const defaultUpdateEmployeeFormState: UpdateEmployeeFormState = {
    first_name: defaultFormFieldState,
    middle_name: defaultFormFieldState,
    surname: defaultFormFieldState,
    email: defaultFormFieldState,
    phone_number: defaultFormFieldState,
    manager_id: defaultFormFieldState,
    department_id: defaultFormFieldState,
    position_id: defaultFormFieldState,
}