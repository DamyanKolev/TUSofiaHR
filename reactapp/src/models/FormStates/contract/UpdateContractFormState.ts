import { ContractView } from "@/models/TableViews/ContractView";
import { FormFieldState, FormState, defaultUpdateFieldState } from "../FormState"


export interface UpdateContractFormState extends FormState{
    workingWage: FormFieldState;
    workTime: FormFieldState;
    annualLeave: FormFieldState;
    conclusionDate: FormFieldState;
    executionDate: FormFieldState;
    contractTerm: FormFieldState;
    additionalAgreementDate: FormFieldState;
    terminationDate: FormFieldState,
    changeDate: FormFieldState,
    companyId: FormFieldState;
    contractTypeId: FormFieldState;
    positionId: FormFieldState;
    iconomicActivityId: FormFieldState;
    documentTypeId: FormFieldState;
    administrativeTerritoryId: FormFieldState;
    terminationTypeId: FormFieldState
}

export const defaultUpdateContractFormState: UpdateContractFormState = {
    workingWage: defaultUpdateFieldState,
    workTime: defaultUpdateFieldState,
    annualLeave: defaultUpdateFieldState,
    conclusionDate: defaultUpdateFieldState,
    executionDate: defaultUpdateFieldState,
    contractTerm: defaultUpdateFieldState,
    additionalAgreementDate: defaultUpdateFieldState,
    terminationDate: defaultUpdateFieldState,
    changeDate: defaultUpdateFieldState,
    companyId: defaultUpdateFieldState,
    contractTypeId: defaultUpdateFieldState,
    positionId: defaultUpdateFieldState,
    iconomicActivityId: defaultUpdateFieldState,
    documentTypeId: defaultUpdateFieldState,
    administrativeTerritoryId: defaultUpdateFieldState,
    terminationTypeId: defaultUpdateFieldState,
}



export interface ContractUpdateData {
    contractTypeId: string,
    positionId: string,
    iconomicActivityId: string,
    documentTypeId: string,
    terminationTypeId: string,
    administrativeTerritoryId: string,
}

export const defaultContractUpdateData: ContractUpdateData = {
    contractTypeId: "",
    positionId: "",
    iconomicActivityId: "",
    documentTypeId: "",
    terminationTypeId: "",
    administrativeTerritoryId: "",
}

export function createContractUpdateData(contract: ContractView): ContractUpdateData {
    return {
        contractTypeId: contract.contractType,
        positionId: contract.positionName,
        iconomicActivityId: contract.activityName,
        documentTypeId: contract.documentType,
        terminationTypeId: contract.documentType,
        administrativeTerritoryId: contract.ekatte,
    }
}