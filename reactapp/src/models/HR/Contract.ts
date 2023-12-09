//table select type
export type Contract = {
    id: int,
    workingWage: number;
    workTime: number;
    conclusionDate: string;
    executionDate: string;
}


export type ContractDTO = {
    workingWage: number;
    workTime: number;
    annualLeave: number;
    conclusionDate: string;
    executionDate: Date;
}

