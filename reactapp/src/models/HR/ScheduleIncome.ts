import { Income } from "./Income";
import { Schedule } from "./Schedule";

export interface ScheduleIncome {
    income: Income,
    schedule: Schedule
}

export interface ScheduleIncomeInsert  {
    incomes: Array<Income>,
    schedules: Array<Schedule>
}