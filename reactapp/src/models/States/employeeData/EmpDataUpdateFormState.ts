import { AddressFormState, defaultAddressUpdateFormState } from "../address/AddressFormState";
import { ContractUpdateData, ContractUpdateFormState, defaultContractUpdateData, defaultContractUpdateFormState } from "../contract/ContractUpdateFormState";
import { EmployeeUpdateData, EmployeeUpdateFormState, defaultEmployeeUpdateFormState, defualtEmployeeUpdateData } from "../employee/EmployeeUpdateFormState";
import { InsuranceFormState, InsuranceUpdateData, defaultInsuranceUpdateData, defaultInsuranceUpdateFormState } from "../insurance/InsuranceFormState";
import { PDataFormState, defaultPDataUpdateFormState } from "../personalData/PersonalDataFormState";


export interface EmpDataUpdateFormState {
    employee: EmployeeUpdateFormState,
    contract: ContractUpdateFormState,
    personalData: PDataFormState
    insurance: InsuranceFormState
    address: AddressFormState
}

export const defaultEmpDataUpdateState: EmpDataUpdateFormState = {
    employee: defaultEmployeeUpdateFormState,
    contract: defaultContractUpdateFormState,
    personalData: defaultPDataUpdateFormState,
    insurance: defaultInsuranceUpdateFormState,
    address: defaultAddressUpdateFormState
}


export interface EmployeeDataUpdateData {
    employee: EmployeeUpdateData,
    contract: ContractUpdateData,
    insurance: InsuranceUpdateData
}

export const defaultEmployeeDataUpdateData: EmployeeDataUpdateData= {
    employee: defualtEmployeeUpdateData,
    contract: defaultContractUpdateData,
    insurance: defaultInsuranceUpdateData
}