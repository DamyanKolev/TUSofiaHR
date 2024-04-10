import { Contract, ContractInsertDTO, defaultContractInsert, defaultContractUpdateDTO } from "./Contract";
import { Employee, EmployeeInsertDTO, defaultEmployeeInsert, defaultEmployeeUpdateDTO } from "./Employee";
import { PersonalData, PersonalDataDTO, defaultPDataUpdateDTO, defaultPersonalDataDTO } from "./PersonalData";
import { ContractView } from "@models/TableViews/ContractView";
import { Address, AddressDTO, defaultAddressDTO, defaultUpdateAddressDTO } from "./Address";
import { Insurance, InsuranceDTO, defaultInsuranceDTO, defaultInsuranceUpdateDTO } from "./Insurance";


export interface EmployeeData {
    employee: Employee,
    personalData: PersonalData,
    contract: Contract,
    contractView: ContractView,
    insurance: Insurance
    address: Address
}



export interface EmployeeDataUpdate {
    employee: Employee,
    personalData: PersonalData,
    contract: Contract,
    insurance: Insurance,
    address: Address,
}

export const defaultEmployeeDataUpdate: EmployeeDataUpdate = {
    employee: defaultEmployeeUpdateDTO,
    contract: defaultContractUpdateDTO,
    personalData: defaultPDataUpdateDTO,
    insurance: defaultInsuranceUpdateDTO,
    address: defaultUpdateAddressDTO
}




export interface EmployeeDataInsert {
    employee: EmployeeInsertDTO,
    personalData: PersonalDataDTO,
    contract: ContractInsertDTO,
    insurance: InsuranceDTO,
    address: AddressDTO,
}

export const defaultEmployeeDataInsert:EmployeeDataInsert = {
    employee: defaultEmployeeInsert,
    personalData: defaultPersonalDataDTO,
    contract: defaultContractInsert,
    insurance: defaultInsuranceDTO,
    address: defaultAddressDTO

}


// Employee insert DTO 
export interface EmployeeDataInsertDTO {
    employee: EmployeeInsertDTO,
    personalData: PersonalDataDTO,
    contract: ContractInsertDTO| null,
    insurance: InsuranceDTO| null,
    address: AddressDTO,
}

export function createEmployeeDataInsertDTO(
    employee: EmployeeInsertDTO, 
    pData: PersonalDataDTO, 
    contract: ContractInsertDTO | null, 
    insurance: InsuranceDTO| null,
    address: AddressDTO
): EmployeeDataInsertDTO {
    return {
        employee: {
            ...employee, 
            companyEmployeeId: 123, 
            personalDataId: 0
        },
        personalData: pData,
        contract: contract,
        insurance: insurance,
        address: address
    }
}


// Employee update DTO 
export interface EmployeeDataUpdateDTO {
    employee: Employee | null,
    personalData: PersonalData | null,
    contract: Contract | null,
    insurance: Insurance | null,
    address: Address | null,
}

//update form edit buttons for every form
export interface EmployeeDataEditBtnState {
    empEdit: boolean,
    conEdit: boolean,
    pDataEdit: boolean
    insuranceEdit: boolean,
}

export const defaultEditBtnsState:EmployeeDataEditBtnState = {
    empEdit: false,
    conEdit: false,
    pDataEdit: false,
    insuranceEdit: false,
}