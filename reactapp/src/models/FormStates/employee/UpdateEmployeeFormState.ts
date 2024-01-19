import { EmployeeView } from "@/models/TableViews/EmployeeView";
import { FormFieldState, FormState, defaultFormFieldState } from "../FormState";

export interface UpdateEmployeeFormState extends FormState{
    firstName: FormFieldState;
    middleName: FormFieldState;
    surname: FormFieldState;
    email: FormFieldState;
    phoneNumber: FormFieldState;
    managerId: FormFieldState;
    departmentId: FormFieldState;
    positionId: FormFieldState;
}

export const defaultUpdateEmployeeFormState: UpdateEmployeeFormState = {
    firstName: defaultFormFieldState,
    middleName: defaultFormFieldState,
    surname: defaultFormFieldState,
    email: defaultFormFieldState,
    phoneNumber: defaultFormFieldState,
    managerId: defaultFormFieldState,
    departmentId: defaultFormFieldState,
    positionId: defaultFormFieldState
}


export interface EmployeeFormUpdateData {
    managerId: string,
    departmentId: string,
    positionId: string
}

export function createEmployeeFormUpdateData(employee: EmployeeView): EmployeeFormUpdateData {

    return {
        managerId: employee.managerName,
        departmentId: employee.departmentName,
        positionId: employee.positionName
    }
}

