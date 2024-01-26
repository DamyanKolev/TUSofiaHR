import { FormFieldState, FormState, defaultInsertFieldState } from "../FormState";

export interface InsertEmployeeFormState extends FormState{
    firstName: FormFieldState;
    middleName: FormFieldState;
    surname: FormFieldState;
    email: FormFieldState;
    phoneNumber: FormFieldState;
    companyEmployeeId: FormFieldState;
    managerId: FormFieldState;
    departmentId: FormFieldState;
    positionId: FormFieldState;
}

export const defaultInsertEmployeeFormState: InsertEmployeeFormState = {
    firstName: defaultInsertFieldState,
    middleName: defaultInsertFieldState,
    surname: defaultInsertFieldState,
    email: defaultInsertFieldState,
    phoneNumber: defaultInsertFieldState,
    companyEmployeeId: defaultInsertFieldState,
    managerId: defaultInsertFieldState,
    departmentId: defaultInsertFieldState,
    positionId: defaultInsertFieldState,
}