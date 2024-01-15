import { FormFieldState, FormState, defaultFormFieldState } from "../FormState"

export interface InsertContractFormState extends FormState{
    working_wage: FormFieldState;
    work_time: FormFieldState;
    annual_leave: FormFieldState;
    conclusion_date: FormFieldState;
    execution_date: FormFieldState;
    contract_term: FormFieldState;
    additional_agreement_date: FormFieldState;
    contract_type_id: FormFieldState;
    sys_position_id: FormFieldState;
    sys_iconomic_activity_id: FormFieldState;
    document_type_id: FormFieldState;
    sys_administrative_territory_id: FormFieldState;
    code_corection: FormFieldState;
}

export const defaultInsertContractFormState: InsertContractFormState = {
    working_wage: defaultFormFieldState,
    work_time: defaultFormFieldState,
    annual_leave: defaultFormFieldState,
    conclusion_date: defaultFormFieldState,
    execution_date: defaultFormFieldState,
    contract_term: defaultFormFieldState,
    additional_agreement_date: defaultFormFieldState,
    contract_type_id: defaultFormFieldState,
    sys_position_id: defaultFormFieldState,
    sys_iconomic_activity_id: defaultFormFieldState,
    document_type_id: defaultFormFieldState,
    sys_administrative_territory_id: defaultFormFieldState,
    code_corection: defaultFormFieldState,
}