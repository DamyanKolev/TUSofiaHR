import { FormFieldState, FormState, defaultInsertFieldState } from "../FormState";

export interface EmployeeInsertFormState extends FormState{
    firstName: FormFieldState;
    middleName: FormFieldState;
    surname: FormFieldState;
    phoneNumber: FormFieldState;
    managerId: FormFieldState;
    departmentId: FormFieldState;
    positionId: FormFieldState;
}

export const defaultEmployeeInsertFormState: EmployeeInsertFormState = {
    firstName: defaultInsertFieldState,
    middleName: defaultInsertFieldState,
    surname: defaultInsertFieldState,
    phoneNumber: defaultInsertFieldState,
    managerId: defaultInsertFieldState,
    departmentId: defaultInsertFieldState,
    positionId: defaultInsertFieldState,
}