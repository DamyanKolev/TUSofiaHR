export interface Contract {
    id: int,
    workingWage: number;
    workTime: number;
    conclusionDate: string;
}

export interface ContractDTO {
    workingWage: number | string;
    workTime: number | string;
    conclusionDate: string;
}