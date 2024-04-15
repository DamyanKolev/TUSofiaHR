import { defaultInsertFieldState, defaultUpdateFieldState, FormFieldState, FormState } from "../FormState"



export interface IncomeFormState extends FormState {
    healtInsuranceArt40: FormFieldState,
    totalInsurance: FormFieldState,
    healthInsurance: FormFieldState
    grossRemuneration: FormFieldState,
    bonusIncome: FormFieldState,
    additionalIncome: FormFieldState,
}

export const defaultIncomeInsertFormState: IncomeFormState = {
    healtInsuranceArt40: defaultInsertFieldState,
    totalInsurance: defaultInsertFieldState,
    healthInsurance: defaultInsertFieldState,
    grossRemuneration: defaultInsertFieldState,
    bonusIncome: defaultInsertFieldState,
    additionalIncome: defaultInsertFieldState,
}

export const defaultIncomeUpdateFormState: IncomeFormState = {
    healtInsuranceArt40: defaultUpdateFieldState,
    totalInsurance: defaultUpdateFieldState,
    healthInsurance: defaultUpdateFieldState,
    grossRemuneration: defaultUpdateFieldState,
    bonusIncome: defaultUpdateFieldState,
    additionalIncome: defaultUpdateFieldState,
}