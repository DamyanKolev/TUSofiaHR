import { FormFieldState, FormState, defaultInsertFieldState } from "../FormState"

export interface ContractInsertFormState extends FormState{
    workingWage: FormFieldState;
    workTime: FormFieldState;
    annualLeave: FormFieldState;
    conclusionDate: FormFieldState;
    executionDate: FormFieldState;
    contractTerm: FormFieldState;
    contractTypeId: FormFieldState;
    sysPositionId: FormFieldState;
    sysIconomicActivityId: FormFieldState;
    documentTypeId: FormFieldState;
    sysAdministrativeTerritoryId: FormFieldState;
}

export const defaultContractInsertFormState: ContractInsertFormState = {
    workingWage: defaultInsertFieldState,
    workTime: defaultInsertFieldState,
    annualLeave: defaultInsertFieldState,
    conclusionDate: defaultInsertFieldState,
    executionDate: defaultInsertFieldState,
    contractTerm: defaultInsertFieldState,
    contractTypeId: defaultInsertFieldState,
    sysPositionId: defaultInsertFieldState,
    sysIconomicActivityId: defaultInsertFieldState,
    documentTypeId: defaultInsertFieldState,
    sysAdministrativeTerritoryId: defaultInsertFieldState,
}





export interface AnnexInsertFormState extends FormState{
    conclusionDate: FormFieldState;
    contractTerm: FormFieldState;
    additionalAgreementDate: FormFieldState;
    contractTypeId: FormFieldState;
}


export const defaultAnnexInsertFormState: AnnexInsertFormState = {
    conclusionDate: defaultInsertFieldState,
    contractTerm: defaultInsertFieldState,
    additionalAgreementDate: defaultInsertFieldState,
    contractTypeId: defaultInsertFieldState,
}