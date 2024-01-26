import { ContractUpdateData, UpdateContractFormState, defaultContractUpdateData, defaultUpdateContractFormState } from "../contract/UpdateContractFormState";
import { EmployeeUpdateData, UpdateEmployeeFormState, defaultUpdateEmployeeFormState, defualtEmployeeUpdateData } from "../employee/UpdateEmployeeFormState";
import { PDataFormState, defaultPDataUpdateFormState } from "../personalData/PersonalDataFormState";


export interface EmpDataUpdateFormState {
    employee: UpdateEmployeeFormState,
    contract: UpdateContractFormState,
    personal_data: PDataFormState
}

export const defaultEmpDataUpdateState: EmpDataUpdateFormState = {
    employee: defaultUpdateEmployeeFormState,
    contract: defaultUpdateContractFormState,
    personal_data: defaultPDataUpdateFormState,
}


export interface EmployeeDataUpdateData {
    employee: EmployeeUpdateData,
    contract: ContractUpdateData
}

export const defaultEmployeeDataUpdateData: EmployeeDataUpdateData= {
    employee: defualtEmployeeUpdateData,
    contract: defaultContractUpdateData
}