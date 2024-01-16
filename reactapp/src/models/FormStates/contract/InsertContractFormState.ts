import { FormFieldState, FormState, defaultFormFieldState } from "../FormState"

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
    codeCorection: FormFieldState;
}

export const defaultInsertContractFormState: InsertContractFormState = {
    workingWage: defaultFormFieldState,
    workTime: defaultFormFieldState,
    annualLeave: defaultFormFieldState,
    conclusionDate: defaultFormFieldState,
    executionDate: defaultFormFieldState,
    contractTerm: defaultFormFieldState,
    additionalAgreementDate: defaultFormFieldState,
    contractTypeId: defaultFormFieldState,
    positionId: defaultFormFieldState,
    iconomicActivityId: defaultFormFieldState,
    documentTypeId: defaultFormFieldState,
    administrativeTerritoryId: defaultFormFieldState,
    codeCorection: defaultFormFieldState,
}