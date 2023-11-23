export interface Contract {
    id: int,
    workingWage: number;
    workTime: number;
    conclusionDate: string;
}

export interface ContractRequest {
    workingWage: number;
    workTime: number;
    conclusionDate: string;
}