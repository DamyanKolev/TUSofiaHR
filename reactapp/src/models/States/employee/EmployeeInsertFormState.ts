import { FormFieldState, FormState, defaultInsertFieldState } from "../FormState";

export interface EmployeeInsertFormState extends FormState{
    firstName: FormFieldState;
    middleName: FormFieldState;
    surname: FormFieldState;
    email: FormFieldState;
    phoneNumber: FormFieldState;
    // company_employee_id: FormFieldState;
    managerId: FormFieldState;
    departmentId: FormFieldState;
    positionId: FormFieldState;
}

export const defaultEmployeeInsertFormState: EmployeeInsertFormState = {
    firstName: defaultInsertFieldState,
    middleName: defaultInsertFieldState,
    surname: defaultInsertFieldState,
    email: defaultInsertFieldState,
    phoneNumber: defaultInsertFieldState,
    // company_employee_id: defaultInsertFieldState,
    managerId: defaultInsertFieldState,
    departmentId: defaultInsertFieldState,
    positionId: defaultInsertFieldState,
}