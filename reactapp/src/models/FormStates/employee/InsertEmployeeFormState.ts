import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

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
    firstName: defaultFormFieldState,
    middleName: defaultFormFieldState,
    surname: defaultFormFieldState,
    email: defaultFormFieldState,
    phoneNumber: defaultFormFieldState,
    companyEmployeeId: defaultFormFieldState,
    managerId: defaultFormFieldState,
    departmentId: defaultFormFieldState,
    positionId: defaultFormFieldState,
}