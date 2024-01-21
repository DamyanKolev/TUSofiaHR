import { Contract, ContractInsertDTO } from "./Contract"
import { Employee, EmployeeInsertDTO } from "./Employee"
import { PersonalData, PersonalDataDTO } from "./PersonalData"

export interface EmployeeData {
    employee: Employee,
    personalData: PersonalData,
    contract: Contract | null,
}

export interface EmployeeDataInsert {
    employee: EmployeeInsertDTO,
    personalData: PersonalDataDTO,
    contract: ContractInsertDTO| null,
}

export function createEmployeeDataInsert(employee: EmployeeInsertDTO, pData: PersonalDataDTO, contract: ContractInsertDTO): EmployeeDataInsert {
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

export interface EmployeeDataUpdate {
    employee: Employee | null,
    personalData: PersonalData | null,
    contract: Contract | null,
}

export function createEmployeeDataUpdate(
    employee: Employee | null, 
    pData: PersonalData | null, 
    contract: Contract | null,
):  EmployeeDataUpdate {
    return {
        employee: employee,
        personalData: pData,
        contract: contract
    }
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