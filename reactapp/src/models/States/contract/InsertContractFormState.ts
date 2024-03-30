import { FormFieldState, FormState, defaultInsertFieldState } from "../FormState"

export interface InsertContractFormState extends FormState{
    workingWage: FormFieldState;
    workTime: FormFieldState;
    annualLeave: FormFieldState;
    conclusionDate: FormFieldState;
    executionDate: FormFieldState;
    contractTerm: FormFieldState;
    additionalAgreementDate: FormFieldState;
    contractTypeId: FormFieldState;
    positionId: FormFieldState;
    iconomicActivityId: FormFieldState;
    documentTypeId: FormFieldState;
    administrativeTerritoryId: FormFieldState;
    // codeCorection: FormFieldState;
}

export const defaultInsertContractFormState: InsertContractFormState = {
    workingWage: defaultInsertFieldState,
    workTime: defaultInsertFieldState,
    annualLeave: defaultInsertFieldState,
    conclusionDate: defaultInsertFieldState,
    executionDate: defaultInsertFieldState,
    contractTerm: defaultInsertFieldState,
    additionalAgreementDate: defaultInsertFieldState,
    contractTypeId: defaultInsertFieldState,
    positionId: defaultInsertFieldState,
    iconomicActivityId: defaultInsertFieldState,
    documentTypeId: defaultInsertFieldState,
    administrativeTerritoryId: defaultInsertFieldState,
    // codeCorection: defaultFormFieldState,
}