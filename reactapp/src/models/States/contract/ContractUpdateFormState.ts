import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState"
import { ContractView } from "@models/TableViews/ContractView";

export interface ContractUpdateFormState extends FormState{
    workingWage: FormFieldState;
    workTime: FormFieldState;
    annualLeave: FormFieldState;
    conclusionDate: FormFieldState;
    executionDate: FormFieldState;
    contractTerm: FormFieldState;
    additionalAgreementDate: FormFieldState;
    terminationDate: FormFieldState,
    sysPositionId: FormFieldState;
    sysIconomicActivityId: FormFieldState;
    documentTypeId: FormFieldState;
    sysAdministrativeTerritoryId: FormFieldState;
    terminationTypeId: FormFieldState
}

export const defaultContractUpdateFormState: ContractUpdateFormState = {
    workingWage: defaultUpdateFieldState,
    workTime: defaultUpdateFieldState,
    annualLeave: defaultUpdateFieldState,
    conclusionDate: defaultUpdateFieldState,
    executionDate: defaultUpdateFieldState,
    contractTerm: defaultUpdateFieldState,
    additionalAgreementDate: defaultUpdateFieldState,
    terminationDate: defaultUpdateFieldState,
    sysPositionId: defaultUpdateFieldState,
    sysIconomicActivityId: defaultUpdateFieldState,
    documentTypeId: defaultUpdateFieldState,
    sysAdministrativeTerritoryId: defaultUpdateFieldState,
    terminationTypeId: defaultUpdateFieldState,
}


export const defaultTerminationFormState: ContractUpdateFormState = {
    workingWage: defaultUpdateFieldState,
    workTime: defaultUpdateFieldState,
    annualLeave: defaultUpdateFieldState,
    conclusionDate: defaultUpdateFieldState,
    executionDate: defaultUpdateFieldState,
    contractTerm: defaultUpdateFieldState,
    additionalAgreementDate: defaultUpdateFieldState,
    terminationDate: defaultInsertFieldState,
    sysPositionId: defaultUpdateFieldState,
    sysIconomicActivityId: defaultUpdateFieldState,
    documentTypeId: defaultUpdateFieldState,
    sysAdministrativeTerritoryId: defaultUpdateFieldState,
    terminationTypeId: defaultInsertFieldState,
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