import { CompanyEmployeeTax, CompanyEmployeeTaxInsert, createDefaultCompanyEmployeeTax, defaultCompanyEmployeeTaxUpdate } from "./CompanyEmployeeTax";
import { createDefaultIncomeInsert, defaultIncomeUpdate, Income, IncomeInsert } from "./Income";
import { createDefaultScheduleInsert, defaultScheduleUpdate, Schedule, ScheduleInsert } from "./Schedule";

export interface EndMonthDataInsert
{
    income: IncomeInsert
    schedule: ScheduleInsert
    companyEmployeeTax: CompanyEmployeeTaxInsert
}

export const createEndMonthDataInsert = (employeeId: int): EndMonthDataInsert => {
    return {
        income: createDefaultIncomeInsert(employeeId),
        schedule: createDefaultScheduleInsert(employeeId),
        companyEmployeeTax: createDefaultCompanyEmployeeTax(employeeId)
    }
}


export interface EndMonthDataUpdate
{
    income: Income
    schedule: Schedule
    companyEmployeeTax: CompanyEmployeeTax
}

export const createEndMonthDataUpdate = (): EndMonthDataUpdate => {
    return {
        income: defaultIncomeUpdate,
        schedule: defaultScheduleUpdate,
        companyEmployeeTax: defaultCompanyEmployeeTaxUpdate
    }
}

