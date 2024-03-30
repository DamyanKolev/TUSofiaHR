import { InsertContractFormState, defaultInsertContractFormState } from "../contract/InsertContractFormState"
import { InsertEmployeeFormState, defaultInsertEmployeeFormState } from "../employee/InsertEmployeeFormState"
import { PDataFormState, defaultPDataInsertFormState } from "../personalData/PersonalDataFormState"



export interface EmpDataInsertFormState {
    employee: InsertEmployeeFormState,
    contract: InsertContractFormState,
    personalData: PDataFormState
}

export const defaultEmpDataInsertState: EmpDataInsertFormState = {
    employee: defaultInsertEmployeeFormState,
    contract: defaultInsertContractFormState,
    personalData: defaultPDataInsertFormState,
}