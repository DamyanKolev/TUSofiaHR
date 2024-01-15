export interface ContractView {
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
    is_terminate: boolean,
    article62_flag: boolean;
}