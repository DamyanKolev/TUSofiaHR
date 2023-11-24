import { FormFieldState } from "./FormState";

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


export interface EmployeeFormState {
    firstName: FormFieldState;
    surname: FormFieldState;
    lastName: FormFieldState;
}