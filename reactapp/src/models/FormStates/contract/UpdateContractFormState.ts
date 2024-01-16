import { FormFieldState, FormState, defaultFormFieldState } from "../FormState"

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
    codeCorection: FormFieldState;
    article62Flag: FormFieldState,
}

export const defaultUpdateContractFormState: UpdateContractFormState = {
    workingWage: defaultFormFieldState,
    workTime: defaultFormFieldState,
    annualLeave: defaultFormFieldState,
    conclusionDate: defaultFormFieldState,
    executionDate: defaultFormFieldState,
    contractTerm: defaultFormFieldState,
    additionalAgreementDate: defaultFormFieldState,
    terminationDate: defaultFormFieldState,
    changeDate: defaultFormFieldState,
    companyId: defaultFormFieldState,
    contractTypeId: defaultFormFieldState,
    positionId: defaultFormFieldState,
    iconomicActivityId: defaultFormFieldState,
    documentTypeId: defaultFormFieldState,
    administrativeTerritoryId: defaultFormFieldState,
    terminationTypeId: defaultFormFieldState,
    codeCorection: defaultFormFieldState,
    article62Flag: defaultFormFieldState,
}