// select type
export type Contract = {
    contract_id: int,
    working_wage: float;
    work_time: int;
    annual_leave: int;
    company_name: string;
    company_eic: string;
    conclusion_date: Date;
    execution_date: Date;
    contract_term: Date;
    additional_agreement_date: Date;
    termination_date: Date;
    change_date: Date;
    state_position_name: string;
    activity_name: string;
    contract_type: string;
    code_corection: int;
    document_type: string;
    ekatte: string;
    article62_flag: boolean;
}

export type ContractDTO = {
    working_wage: float;
    work_time: int;
    annual_leave: int;
    conclusion_date: Date;
    execution_date: Date;
    contract_term: Date;
    additional_agreement_date: Date;
    company_id: int;
    contract_type_id: int;
    sys_position_id: int;
    sys_iconomic_activity_id: int;
    document_type_id: int;
    sys_administrative_territory_id: int;
    code_corection: int;
}

