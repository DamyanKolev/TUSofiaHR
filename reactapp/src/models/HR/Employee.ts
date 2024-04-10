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
    insuranceId: int;
    positionId: int;
}


export const defaultEmployeeUpdateDTO: Employee = {
    employeeId: 0,
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    managerId: 0,
    departmentId: 0,
    insuranceId: 0,
    positionId: 0,
}


export interface EmployeeInsertDTO {
    firstName: string;
    middleName: string;
    surname: string;
    email: string;
    phoneNumber: string
    companyEmployeeId: int;
    personalDataId: int,
    managerId: int | string;
    departmentId: int;
    insuranceId: int;
    positionId: int;
}
export const defaultEmployeeInsert: EmployeeInsertDTO = {
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    managerId: "",
    departmentId: 0,
    insuranceId: 0,
    positionId: 0,
}