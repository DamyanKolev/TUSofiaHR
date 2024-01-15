import { Contract } from "./Contract";
import { PersonalData } from "./PersonalData";

export interface Employee {
    employee_id: int,
    first_name: string;
    middle_name: string;
    surname: string;
    email: string;
    phone_number: string,
    company_employee_id: int;
    personal_data_id: int;
    manager_id: int;
    department_id: int;
    position_id: int;
}


export interface EmployeeData {
    employee: Employee,
    personal_data: PersonalData,
    contract: Contract,
}


export interface EmployeeInsertDTO {
    first_name: string;
    middle_name: string;
    surname: string;
    email: string;
    phone_number: string
    company_employee_id: int;
    personal_data_id: int,
    manager_id: int;
    department_id: int;
    position_id: int;
}
export const defaultEmployeeInsert: EmployeeInsertDTO = {} as EmployeeInsertDTO

export interface EmployeeUpdateDTO {
    first_name: string;
    middle_name: string;
    surname: string;
    email: string;
    phone_number: string
    manager_id: int;
    department_id: int;
    position_id: int;
}
export const defaultEmployeeUpdate: EmployeeUpdateDTO = {} as EmployeeUpdateDTO