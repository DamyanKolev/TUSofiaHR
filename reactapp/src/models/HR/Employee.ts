export interface Employee {
    id: int,
    firstName: string;
    middleName: string;
    surname: string;
    email: string;
    phoneNumber: string,
    companyEmployeeId: int;
    personalDataId: int;
    managerId: int | string;
    departmentId: int;
    positionId: int;
    companyId: int,
}

export const defaultEmployee = {
    id: 0,
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    managerId: "",
    departmentId: 0,
    positionId: 0,
    companyId: 0,
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
export const defaultEmployeeInsert: EmployeeInsertDTO = {
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    managerId: 0,
    departmentId: 0,
    positionId: 0,
}
