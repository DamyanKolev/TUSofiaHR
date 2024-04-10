import { EmployeeView } from "@models/TableViews/EmployeeView";
import { FormFieldState, FormState, defaultUpdateFieldState } from "../FormState";

export interface EmployeeUpdateFormState extends FormState{
    firstName: FormFieldState;
    middleName: FormFieldState;
    surname: FormFieldState;
    email: FormFieldState;
    phoneNumber: FormFieldState
    managerId: FormFieldState;
    departmentId: FormFieldState;
    positionId: FormFieldState;
}

export const defaultEmployeeUpdateFormState: EmployeeUpdateFormState = {
    firstName: defaultUpdateFieldState,
    middleName: defaultUpdateFieldState,
    surname: defaultUpdateFieldState,
    email: defaultUpdateFieldState,
    phoneNumber: defaultUpdateFieldState,
    managerId: defaultUpdateFieldState,
    departmentId: defaultUpdateFieldState,
    positionId: defaultUpdateFieldState,
}


export interface EmployeeUpdateData {
    managerId: string,
    departmentId: string,
    positionId: string
}

export const defualtEmployeeUpdateData: EmployeeUpdateData = {
    managerId: "",
    departmentId: "",
    positionId: ""
}

export function createEmployeeUpdateData(employee: EmployeeView): EmployeeUpdateData {

    return {
        managerId: employee.managerName,
        departmentId: employee.departmentName,
        positionId: employee.positionName
    }
}