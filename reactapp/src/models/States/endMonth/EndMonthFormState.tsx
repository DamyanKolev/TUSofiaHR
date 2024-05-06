import { CompanyEmployeeTaxFormState, defaultCompanyEmployeeTaxInsertFormState, defaultCompanyEmployeeTaxUpdateFormState } from "../companyEmployeeTax/CompanyEmployeeTaxFormState"
import { FormState } from "../FormState"
import { defaultIncomeInsertFormState, defaultIncomeUpdateFormState, IncomeFormState } from "../incomes/IncomeFormState"
import { defaultScheduleInsertFormState, defaultScheduleUpdateFormState, ScheduleFormState } from "../schedule/ScheduleFormState"


export interface EndMonthFormState extends FormState {
    income: IncomeFormState,
    schedule: ScheduleFormState
    companyEmployeeTax: CompanyEmployeeTaxFormState
}

export const defaultEndMonthInsertFormState: EndMonthFormState = {
    income: defaultIncomeInsertFormState,
    schedule: defaultScheduleInsertFormState,
    companyEmployeeTax: defaultCompanyEmployeeTaxInsertFormState
}

export const defaultEndMonthUpdateFormState: EndMonthFormState = {
    income: defaultIncomeUpdateFormState,
    schedule: defaultScheduleUpdateFormState,
    companyEmployeeTax: defaultCompanyEmployeeTaxUpdateFormState
}