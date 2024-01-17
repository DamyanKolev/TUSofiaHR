import { Contract } from "./Contract";
import { PersonalData } from "./PersonalData";

export interface Employee {
    employeeId: int,
    firstName: string;
    middleName: string;
    surname: string;
    email: string;
    phoneNumber: string,
    companyEmployeeId: int;
    personalDataId: int;
    managerId: int;
    departmentId: int;
    positionId: int;
}


export interface EmployeeData {
    employee: Employee,
    personal_data: PersonalData,
    contract: Contract,
}


export interface EmployeeInsertDTO {
    firstName: string;
    middleName: string;
    surname: string;
    email: string;
    phoneNumber: string
    companyEmployeeId: int;
    personalDataId: int,
    managerId: int;
    departmentId: int;
    positionId: int;
}
export const defaultEmployeeInsert: EmployeeInsertDTO = {} as EmployeeInsertDTO

export interface EmployeeUpdateDTO {
    firstName: string;
    middleName: string;
    surname: string;
    email: string;
    phoneNumber: string
    managerId: int;
    departmentId: int;
    positionId: int;
}
export const defaultEmployeeUpdate: EmployeeUpdateDTO = {} as EmployeeUpdateDTO