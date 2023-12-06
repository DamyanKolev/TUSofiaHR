import { FormFieldState, FormState } from "./FormState"

export interface ContractFormState extends FormState{
    workingWage: FormFieldState
    workTime: FormFieldState
    conclusionDate: FormFieldState
}