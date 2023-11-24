import { FormFieldState } from "./FormState";

export interface Contract {
    id: int,
    workingWage: number;
    workTime: number;
    conclusionDate: string;
}

export interface ContractRequest {
    workingWage: number | string;
    workTime: number | string;
    conclusionDate: string;
}

export interface  ContractFormState {
    workingWage: FormFieldState
    workTime: FormFieldState
    conclusionDate: FormFieldState
}