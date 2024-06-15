import { ContractInsertDTO, defaultContractInsert } from "../../Contracts/models/Contract";
import { Employee, EmployeeInsertDTO, EmployeeUpdateData, defaultEmployeeInsert, defaultEmployeeUpdateDTO, defualtEmployeeUpdateData } from "./Employee";
import { PersonalData, PersonalDataDTO, defaultPDataUpdateDTO, defaultPersonalDataDTO } from "./PersonalData";
import { Insurance, InsuranceDTO, InsuranceUpdateData, defaultInsuranceDTO } from "./Insurance";
import { Optional } from "@/types/Optional";
import { Address, AddressDTO, defaultAddressDTO } from "./Address";


export interface EmployeeData {
    employee: Employee,
    personalData: PersonalData,
    insurance: Insurance
    address: Address
}



export interface EmployeeDataInsert {
    employee: EmployeeInsertDTO,
    personalData: PersonalDataDTO,
    contract: ContractInsertDTO| null,
    insurance: InsuranceDTO| null,
    address: AddressDTO,
}

export const defaultEmployeeDataInsert:EmployeeDataInsert = {
    employee: defaultEmployeeInsert,
    personalData: defaultPersonalDataDTO,
    contract: defaultContractInsert,
    insurance: defaultInsuranceDTO,
    address: defaultAddressDTO
}


// Employee update DTO 
export interface EmployeeDataUpdateDTO {
    employee: Employee | null,
    personalData: PersonalData | null,
    insurance: Insurance | null,
    address: Address | null,
}

export const defaultEmployeeDataUpdate:EmployeeDataUpdateDTO = {
    employee: defaultEmployeeUpdateDTO,
    personalData: defaultPDataUpdateDTO,
    insurance: null,
    address: null
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



export interface EmployeeDataUpdateData {
    employee: EmployeeUpdateData,
    insurance: Optional<InsuranceUpdateData>
}

export const defaultEmployeeDataUpdateData: EmployeeDataUpdateData= {
    employee: defualtEmployeeUpdateData,
    insurance: null
}