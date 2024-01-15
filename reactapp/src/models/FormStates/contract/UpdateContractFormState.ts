import { FormFieldState, FormState, defaultFormFieldState } from "../FormState"

export interface UpdateContractFormState extends FormState{
    working_wage: FormFieldState;
    work_time: FormFieldState;
    annual_leave: FormFieldState;
    conclusion_date: FormFieldState;
    execution_date: FormFieldState;
    contract_term: FormFieldState;
    additional_agreement_date: FormFieldState;
    termination_date: FormFieldState,
    change_date: FormFieldState,
    company_id: FormFieldState;
    contract_type_id: FormFieldState;
    sys_position_id: FormFieldState;
    sys_iconomic_activity_id: FormFieldState;
    document_type_id: FormFieldState;
    sys_administrative_territory_id: FormFieldState;
    termination_type_id: FormFieldState
    code_corection: FormFieldState;
    article62_flag: FormFieldState,
}

export const defaultUpdateContractFormState: UpdateContractFormState = {
    working_wage: defaultFormFieldState,
    work_time: defaultFormFieldState,
    annual_leave: defaultFormFieldState,
    conclusion_date: defaultFormFieldState,
    execution_date: defaultFormFieldState,
    contract_term: defaultFormFieldState,
    additional_agreement_date: defaultFormFieldState,
    termination_date: defaultFormFieldState,
    change_date: defaultFormFieldState,
    company_id: defaultFormFieldState,
    contract_type_id: defaultFormFieldState,
    sys_position_id: defaultFormFieldState,
    sys_iconomic_activity_id: defaultFormFieldState,
    document_type_id: defaultFormFieldState,
    sys_administrative_territory_id: defaultFormFieldState,
    termination_type_id: defaultFormFieldState,
    code_corection: defaultFormFieldState,
    article62_flag: defaultFormFieldState,
}