import { Optional } from "@app-types/Optional";

export interface Contract {
    id: int,
    workingWage: Optional<string>;
    workTime: Optional<int>;
    annualLeave: Optional<int>;
    conclusionDate: Date;
    executionDate: Date;
    contractTerm: Optional<Date>;
    additionalAgreementDate: Optional<Date>;
    terminationDate: Optional<Date>;
    changeDate: Optional<Date>;
    contractTypeId: int,
    sysPositionId:Optional<int>,
    sysIconomicActivityId: Optional<int>,
    documentTypeId: int,
    terminationTypeId: Optional<int>,
    sysAdministrativeTerritoryId: Optional<int>,
    codeCorection: int,
    isTerminate: boolean,
    article62Flag: boolean,
}

export const defaultContractUpdateDTO: Contract = {
    id: 0,
    workingWage: "",
    workTime: 0,
    annualLeave: 0,
    conclusionDate: new Date(),
    executionDate: new Date(),
    contractTerm: null,
    additionalAgreementDate: null,
    terminationDate: null,
    changeDate: null,
    contractTypeId: 0,
    sysPositionId:0,
    sysIconomicActivityId: 0,
    documentTypeId: 0,
    terminationTypeId: 0,
    sysAdministrativeTerritoryId: 0,
    codeCorection: 0,
    isTerminate: false,
    article62Flag: false,
}

export interface ContractInsertDTO {
    workingWage: Optional<string>;
    workTime: Optional<int>;
    annualLeave: Optional<int>;
    additionalClause: Optional<string>,
    conclusionDate: Date;
    executionDate: Date;
    contractTerm: Optional<Date>;
    additionalAgreementDate: Optional<Date>;
    contractTypeId: int;
    sysPositionId: Optional<int>;
    sysIconomicActivityId: Optional<int>;
    documentTypeId: int;
    companyEic: string,
    contractId: Optional<int>,
    sysAdministrativeTerritoryId: Optional<int>;
    codeCorection: int;
    isAnnex: boolean,
    article62Flag: boolean,
}

export const defaultContractInsert: ContractInsertDTO = {
    workingWage: "",
    workTime: null,
    annualLeave: null,
    additionalClause: null,
    conclusionDate: new Date(),
    executionDate: new Date(),
    contractTerm: null,
    additionalAgreementDate: null,
    contractTypeId: 0,
    sysPositionId: null,
    sysIconomicActivityId: null,
    documentTypeId: 0,
    companyEic: "",
    contractId: null,
    sysAdministrativeTerritoryId: null,
    codeCorection: 0,
    isAnnex: false,
    article62Flag: false,
}