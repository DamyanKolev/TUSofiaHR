export interface Employee {
    employeeId: int,
    firstName: string;
    middleName: string;
    surname: string;
    phoneNumber: string,
    companyEmployeeId: int;
    personalDataId: int;
    departmentId: int;
    insuranceId: int;
    positionId: int;
}


export const defaultEmployeeUpdateDTO: Employee = {
    employeeId: 0,
    firstName: "",
    middleName: "",
    surname: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    departmentId: 0,
    insuranceId: 0,
    positionId: 0,
}


export interface EmployeeInsertDTO {
    firstName: string;
    middleName: string;
    surname: string;
    phoneNumber: string
    companyEmployeeId: int;
    personalDataId: int,
    departmentId: int;
    insuranceId: int;
    positionId: int;
}
export const defaultEmployeeInsert: EmployeeInsertDTO = {
    firstName: "",
    middleName: "",
    surname: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    departmentId: 0,
    insuranceId: 0,
    positionId: 0,
}