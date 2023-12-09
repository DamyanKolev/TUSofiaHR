import { ValueState } from "@ui5/webcomponents-react"
import { FormFieldState, FormState } from "./FormState"

export interface ContractFormState extends FormState{
    workingWage: FormFieldState
    workTime: FormFieldState
    conclusionDate: FormFieldState
}

export const contractFormState: ContractFormState = {
    workingWage: { isFilled: false, valueState: ValueState.None },
    workTime: { isFilled: false, valueState: ValueState.None },
    conclusionDate: { isFilled: false, valueState: ValueState.None },
}