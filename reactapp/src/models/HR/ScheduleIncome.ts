import { createDefaultIncomeInsert, defaultIncomeUpdate, Income, IncomeInsert } from "./Income";
import { createDefaultScheduleInsert, defaultScheduleUpdate, Schedule, ScheduleInsert } from "./Schedule";


export interface ScheduleIncomeInsert {
    income: IncomeInsert,
    schedule: ScheduleInsert
}


export const createScheduleIncomeInsert = (employeeId: int): ScheduleIncomeInsert => {
    return {
        income: createDefaultIncomeInsert(employeeId),
        schedule: createDefaultScheduleInsert(employeeId)
    }
}

export interface ScheduleIncomeUpdate {
    income: Income,
    schedule: Schedule
}

export const defaultScheduleIncomeUpdate: ScheduleIncomeUpdate = {
    income: defaultIncomeUpdate,
    schedule: defaultScheduleUpdate
}