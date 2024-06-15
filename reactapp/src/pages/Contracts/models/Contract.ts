import { Optional } from "@app-types/Optional";
import { ContractView } from "./Views/ContractView";
import { parseDateToISO } from "@/utils/parsers";

export interface Contract {
    id: int,
    workingWage: Optional<string>;
    workTime: Optional<int>;
    annualLeave: Optional<int>;
    additionalClause: Optional<string>,
    conclusionDate: Optional<string>;
    executionDate: string;
    contractTerm: Optional<string>;
    additionalAgreementDate: Optional<string>;
    terminationDate: Optional<string>;
    changeDate: Optional<string>;
    contractTypeId: int,
    sysPositionId:Optional<int>,
    sysIconomicActivityId: Optional<int>,
    documentTypeId: int,
    companyEic: string,
    terminationTypeId: Optional<int>,
    sysAdministrativeTerritoryId: Optional<int>,
    codeCorection: int,
    isTerminate: boolean,
    article62Flag: boolean,
    isAnnex: boolean,
    creationDate: string
}

export const defaultContractUpdateDTO: Contract = {
    id: 0,
    workingWage: "",
    workTime: 0,
    annualLeave: 0,
    additionalClause: null,
    conclusionDate: null,
    executionDate: "",
    contractTerm: null,
    additionalAgreementDate: null,
    terminationDate: null,
    changeDate: null,
    contractTypeId: 0,
    sysPositionId:0,
    sysIconomicActivityId: 0,
    documentTypeId: 0,
    companyEic: sessionStorage.getItem("companyEIC")!,
    terminationTypeId: 0,
    sysAdministrativeTerritoryId: 0,
    codeCorection: 0,
    isTerminate: false,
    article62Flag: false,
    isAnnex: false,
    creationDate: parseDateToISO(new Date())
}

export interface ContractInsertDTO {
    workingWage: Optional<string>;
    workTime: Optional<int>;
    annualLeave: Optional<int>;
    additionalClause: Optional<string>,
    conclusionDate: Optional<string>;
    executionDate: string;
    contractTerm: Optional<string>;
    additionalAgreementDate: Optional<string>;
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
    conclusionDate: null,
    executionDate: "",
    contractTerm: null,
    additionalAgreementDate: null,
    contractTypeId: 0,
    sysPositionId: null,
    sysIconomicActivityId: null,
    documentTypeId: 0,
    companyEic: sessionStorage.getItem("companyEIC")!,
    contractId: null,
    sysAdministrativeTerritoryId: null,
    codeCorection: 0,
    isAnnex: false,
    article62Flag: false,
}




export interface ContractUpdateData {
    contractTypeId: string,
    sysPositionId: string,
    sysIconomicActivityId: string,
    documentTypeId: string,
    terminationTypeId: string,
    sysAdministrativeTerritoryId: string,
}

export const defaultContractUpdateData: ContractUpdateData = {
    contractTypeId: "",
    sysPositionId: "",
    sysIconomicActivityId: "",
    documentTypeId: "",
    terminationTypeId: "",
    sysAdministrativeTerritoryId: "",
}

export function createContractUpdateData(contract: ContractView): ContractUpdateData {
    return {
        contractTypeId: contract.contractTypeCode,
        sysPositionId: contract.nkpd,
        sysIconomicActivityId: contract.nkid,
        documentTypeId: contract.documentType,
        terminationTypeId: contract.terminationCode,
        sysAdministrativeTerritoryId: contract.ekatte,
    }
}