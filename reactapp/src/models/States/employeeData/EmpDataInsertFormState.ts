import { AddressFormState, defaultAddressInsertFormState } from "../address/AddressFormState"
import { ContractInsertFormState, defaultContractInsertFormState } from "../contract/ContractInsertFormState"
import { EmployeeInsertFormState, defaultEmployeeInsertFormState } from "../employee/EmployeeInsertFormState"
import { InsuranceFormState, defaultInsuranceInsertFormState } from "../insurance/InsuranceFormState"
import { PDataFormState, defaultPDataInsertFormState } from "../personalData/PersonalDataFormState"



export interface EmpDataInsertFormState {
    employee: EmployeeInsertFormState,
    contract: ContractInsertFormState,
    personalData: PDataFormState,
    insurance: InsuranceFormState,
    address: AddressFormState
}

export const defaultEmpDataInsertState: EmpDataInsertFormState = {
    employee: defaultEmployeeInsertFormState,
    contract: defaultContractInsertFormState,
    personalData: defaultPDataInsertFormState,
    insurance: defaultInsuranceInsertFormState,
    address: defaultAddressInsertFormState
}