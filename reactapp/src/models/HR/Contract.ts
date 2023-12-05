export type Contract = {
    id: int,
    workingWage: number;
    workTime: number;
    conclusionDate: string;
}

export type ContractDTO = {
    workingWage: number | string;
    workTime: number | string;
    conclusionDate: string;
}