// select type


export interface Contract {
    id: int,
    workingWage: string;
    workTime: int;
    annualLeave: int;
    conclusionDate: Date;
    executionDate: Date;
    contractTerm: Date;
    additionalAgreementDate: Date;
    terminationDate: Date;
    changeDate: Date;
    companyId: int,
    contractTypeId: int,
    positionId:int,
    iconomicActivityId: int,
    documentTypeId: int,
    terminationTypeId: int,
    administrativeTerritoryId: int,
    codeCorection: int,
    isTerminate: boolean,
    article62Flag: boolean,
}

export interface ContractInsertDTO {
    workingWage: string;
    workTime: int | null;
    annualLeave: int | null;
    conclusionDate: Date | null;
    executionDate: Date | null;
    contractTerm: Date | null;
    additionalAgreementDate: Date | null;
    companyId: int | null;
    contractTypeId: int | null;
    positionId: int | null;
    iconomicActivityId: int | null;
    documentTypeId: int | null;
    administrativeTerritoryId: int | null;
    codeCorection: int | null;
    article62Flag: boolean,
}

export const defaultContractInsert: ContractInsertDTO = {
    workingWage: "",
    workTime: null,
    annualLeave: null,
    conclusionDate: null,
    executionDate: null,
    contractTerm: null,
    additionalAgreementDate: null,
    companyId: 1,
    contractTypeId: null,
    positionId: null,
    iconomicActivityId: null,
    documentTypeId: null,
    administrativeTerritoryId: null,
    codeCorection: 0,
    article62Flag: false
}


export interface ContractUpdateDTO {
    workingWage: string;
    workTime: int | string;
    annualLeave: int | string;
    conclusionDate: Date | string;
    executionDate: Date | string;
    contractTerm: Date | string;
    additionalAgreementDate: Date | string;
    terminationDate: Date | string,
    changeDate: Date | string,
    companyId: int | string;
    contractTypeId: int | string;
    positionId: int | string;
    iconomicActivityId: int | string;
    documentTypeId: int | string;
    administrativeTerritoryId: int | string;
    terminationTypeId: int | string;
    codeCorection: int | string;
    isTerminate: boolean,
    article62Flag: boolean,
}


export const defaultContractUpdate: ContractUpdateDTO = {
    workingWage: "",
    workTime: "",
    annualLeave: "",
    conclusionDate: "",
    executionDate: "",
    contractTerm: "",
    additionalAgreementDate: "",
    terminationDate: "",
    changeDate: "",
    companyId: "",
    contractTypeId: "",
    positionId: "",
    iconomicActivityId: "",
    documentTypeId: "",
    administrativeTerritoryId: "",
    terminationTypeId: "",
    codeCorection: "",
    isTerminate: false,
    article62Flag: false
}