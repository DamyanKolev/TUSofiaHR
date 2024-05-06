import { defaultInsertFieldState, defaultUpdateFieldState, FormFieldState, FormState } from "../FormState"


export interface CompanyEmployeeTaxFormState extends FormState {
    sysPaymentTypeId: FormFieldState,
    disbursementAccrualDate: FormFieldState,
}

export const defaultCompanyEmployeeTaxInsertFormState: CompanyEmployeeTaxFormState = {
    sysPaymentTypeId: defaultInsertFieldState,
    disbursementAccrualDate: defaultInsertFieldState,
}

export const defaultCompanyEmployeeTaxUpdateFormState: CompanyEmployeeTaxFormState = {
    sysPaymentTypeId: defaultUpdateFieldState,
    disbursementAccrualDate: defaultUpdateFieldState,
}