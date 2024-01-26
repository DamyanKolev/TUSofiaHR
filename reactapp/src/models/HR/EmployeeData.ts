import { ContractView } from "../TableViews/ContractView"
import { Contract, ContractInsertDTO, defaultContract, defaultContractInsert } from "./Contract"
import { Employee, EmployeeInsertDTO, defaultEmployee, defaultEmployeeInsert } from "./Employee"
import { PersonalData, PersonalDataDTO, defaultPersonalData, defaultPersonalDataDTO } from "./PersonalData"

export interface EmployeeData {
    employee: Employee,
    personalData: PersonalData,
    contract: Contract,
    contractView: ContractView
}

export interface EmployeeDataUpdate {
    employee: Employee,
    contract: Contract,
    personalData: PersonalData,
}

export const defaultEmployeeDataUpdate: EmployeeDataUpdate = {
    employee: defaultEmployee,
    contract: defaultContract,
    personalData: defaultPersonalData
}

export interface EmployeeDataInsert {
    employee: EmployeeInsertDTO,
    personalData: PersonalDataDTO,
    contract: ContractInsertDTO,
}

export const defaultEmployeeDataInsert:EmployeeDataInsert = {
    employee: defaultEmployeeInsert,
    personalData: defaultPersonalDataDTO,
    contract: defaultContractInsert

}




export interface EmployeeDataInsertDTO {
    employee: EmployeeInsertDTO,
    personalData: PersonalDataDTO,
    contract: ContractInsertDTO| null,
}

export function createEmployeeDataInsert(employee: EmployeeInsertDTO, pData: PersonalDataDTO, contract: ContractInsertDTO): EmployeeDataInsertDTO {
    return {
        employee: {
            ...employee, 
            companyEmployeeId: 123, 
            personalDataId: 0
        },
        personalData: pData,
        contract: contract
    }
}

export interface EmployeeDataUpdateDTO {
    employee: Employee | null,
    contract: Contract | null,
    personalData: PersonalData | null,
}

export interface EmployeeDataEditBtnState {
    empEdit: boolean,
    conEdit: boolean,
    pDataEdit: boolean
}

export const defaultEditBtnsState:EmployeeDataEditBtnState = {
    empEdit: false,
    conEdit: false,
    pDataEdit: false
}