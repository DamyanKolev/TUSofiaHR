import { ValueState } from "@ui5/webcomponents-react"
import { FormFieldState, FormState } from "./FormState"

export interface ContractFormState extends FormState{
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

export const contractFormState: ContractFormState = {
    workingWage: { isFilled: false, valueState: ValueState.None },
    workTime: { isFilled: false, valueState: ValueState.None },
    annualLeave: { isFilled: false, valueState: ValueState.None },
    conclusionDate: { isFilled: false, valueState: ValueState.None },
    executionDate: { isFilled: false, valueState: ValueState.None },
    contractTerm: { isFilled: false, valueState: ValueState.None },
    additionalAgreementDate: { isFilled: false, valueState: ValueState.None },
    contractTypeId: { isFilled: false, valueState: ValueState.None },
    positionId: { isFilled: false, valueState: ValueState.None },
    iconomicActivityId: { isFilled: false, valueState: ValueState.None },
    documentTypeId: { isFilled: false, valueState: ValueState.None },
    administrativeTerritoryId: { isFilled: false, valueState: ValueState.None },
    codeCorection: { isFilled: false, valueState: ValueState.None },
}