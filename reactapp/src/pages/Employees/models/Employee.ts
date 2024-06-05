import { Optional } from "@/types/Optional";
import { EmployeeView } from "./EmployeeView";

export interface Employee {
    id: int,
    firstName: string;
    middleName: string;
    surname: string;
    phoneNumber: string,
    companyEmployeeId: int;
    personalDataId: int;
    departmentId: Optional<int>;
    insuranceId: Optional<int>;
    positionId: Optional<int>;
}


export const defaultEmployeeUpdateDTO: Employee = {
    id: 0,
    firstName: "",
    middleName: "",
    surname: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    departmentId: null,
    insuranceId: null,
    positionId: null,
}


export interface EmployeeInsertDTO {
    firstName: string;
    middleName: string;
    surname: string;
    phoneNumber: string
    companyEmployeeId: int;
    personalDataId: int,
    departmentId: Optional<int>;
    insuranceId: Optional<int>;
    positionId: Optional<int>;
}
export const defaultEmployeeInsert: EmployeeInsertDTO = {
    firstName: "",
    middleName: "",
    surname: "",
    phoneNumber: "",
    companyEmployeeId: 0,
    personalDataId: 0,
    departmentId: null,
    insuranceId: null,
    positionId: null,
}



export interface EmployeeUpdateData {
    managerId: Optional<string>,
    departmentId: Optional<string>,
    positionId: Optional<string>
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