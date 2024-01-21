export interface Employee {
    id: int,
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
    companyId: int,
}

export const defaultEmployee = {} as Employee

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