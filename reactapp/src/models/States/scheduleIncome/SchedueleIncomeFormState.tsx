import { FormState } from "../FormState"
import { defaultIncomeInsertFormState, defaultIncomeUpdateFormState, IncomeFormState } from "../incomes/IncomeFormState"
import { defaultScheduleInsertFormState, defaultScheduleUpdateFormState, ScheduleFormState } from "../schedule/ScheduleFormState"


export interface SchedueleIncomeFormState extends FormState {
    income: IncomeFormState,
    schedule: ScheduleFormState
}

export const defaultSchedueleIncomeInsertFormState: SchedueleIncomeFormState = {
    income: defaultIncomeInsertFormState,
    schedule: defaultScheduleInsertFormState
}

export const defaultSchedueleIncomeUpdateFormState: SchedueleIncomeFormState = {
    income: defaultIncomeUpdateFormState,
    schedule: defaultScheduleUpdateFormState
}