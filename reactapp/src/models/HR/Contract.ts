// select type

import { Option } from "@app-types/OptionType";

export interface Contract {
    id: int,
    working_wage: string;
    work_time: int;
    annual_leave: int;
    conclusion_date: Date;
    execution_date: Date;
    contract_term: Date;
    additional_agreement_date: Date;
    termination_date: Date;
    change_date: Date;
    company_id: int,
    contract_type_id: int,
    sys_position_id:int,
    sys_iconomic_activity_id: int,
    document_type_id: int,
    termination_type_id: int,
    sys_administrative_territory_id: int,
    code_corection: int,
    is_terminate: boolean,
    article62_flag: boolean,
}

export interface ContractInsertDTO {
    working_wage: string;
    work_time: int | null;
    annual_leave: int | null;
    conclusion_date: Date | null;
    execution_date: Date | null;
    contract_term: Option<Date>;
    additional_agreement_date: Option<Date>;
    company_id: int | null;
    contract_type_id: int | null;
    sys_position_id: int | null;
    sys_iconomic_activity_id: int | null;
    document_type_id: int | null;
    sys_administrative_territory_id: int | null;
    code_corection: int | null;
    article62_flag: boolean,
}

export const defaultContractInsert: ContractInsertDTO = {
    working_wage: "",
    work_time: null,
    annual_leave: null,
    conclusion_date: null,
    execution_date: null,
    contract_term: null,
    additional_agreement_date: null,
    company_id: 1,
    contract_type_id: null,
    sys_position_id: null,
    sys_iconomic_activity_id: null,
    document_type_id: null,
    sys_administrative_territory_id: null,
    code_corection: 0,
    article62_flag: false
}


export interface ContractUpdateDTO {
    working_wage: string;
    work_time: int | string;
    annual_leave: int | string;
    conclusion_date: Date | string;
    execution_date: Date | string;
    contract_term: Date | string;
    additional_agreement_date: Date | string;
    termination_date: Date | string,
    change_date: Date | string,
    company_id: int | string;
    contract_type_id: int | string;
    sys_position_id: int | string;
    sys_iconomic_activity_id: int | string;
    document_type_id: int | string;
    sys_administrative_territory_id: int | string;
    termination_type_id: int | string;
    code_corection: int | string;
    is_terminate: boolean,
    article62_flag: boolean,
}


export const defaultContractUpdate: ContractUpdateDTO = {
    working_wage: "",
    work_time: "",
    annual_leave: "",
    conclusion_date: "",
    execution_date: "",
    contract_term: "",
    additional_agreement_date: "",
    termination_date: "",
    change_date: "",
    company_id: "",
    contract_type_id: "",
    sys_position_id: "",
    sys_iconomic_activity_id: "",
    document_type_id: "",
    sys_administrative_territory_id: "",
    termination_type_id: "",
    code_corection: "",
    is_terminate: false,
    article62_flag: false
}