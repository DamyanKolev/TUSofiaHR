//select type
export interface Employee {
    employee_id: int,
    first_name: string;
    middle_name: string;
    surname: string;
    working_wage: float;
    company_employee_id: int;
    manager_first_name: string;
    department_name: string;
    position_name: string;
    state_position_name: string;
}


export interface EmployeeDTO {
    first_name: string;
    middle_name: string;
    surname: string;
    email: string;
    phone_number: string
    company_employee_id: int;
    manager_id: int;
    department_id: int;
    position_id: int;
}