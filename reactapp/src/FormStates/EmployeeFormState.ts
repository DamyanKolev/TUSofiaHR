
//Employee model 
export interface Employee {
    id: int,
    firstName: string;
    surname: string;
    lastName: string;
}

//Employee request
export interface EmployeeRequest {
    firstName: string;
    surname: string;
    lastName: string;
}