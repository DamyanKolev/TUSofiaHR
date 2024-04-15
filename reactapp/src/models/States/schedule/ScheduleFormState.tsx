import { defaultInsertFieldState, defaultUpdateFieldState, FormFieldState, FormState } from "../FormState";


export interface ScheduleFormState extends FormState {
    insuranceDays: FormFieldState,
    insuranceExperienceDays: FormFieldState,
    incapacityDays: FormFieldState,
    childcareDays: FormFieldState,
    withoutInsuranceDays: FormFieldState,
    unpaidLeaveDays: FormFieldState,
    paidIncapacityDays: FormFieldState,
    workedHours: FormFieldState,
    overtimeHours: FormFieldState,
}

export const defaultScheduleInsertFormState: ScheduleFormState = {
    insuranceDays: defaultInsertFieldState,
    insuranceExperienceDays: defaultInsertFieldState,
    incapacityDays: defaultInsertFieldState,
    childcareDays: defaultInsertFieldState,
    withoutInsuranceDays: defaultInsertFieldState,
    unpaidLeaveDays: defaultInsertFieldState,
    paidIncapacityDays: defaultInsertFieldState,
    workedHours: defaultInsertFieldState,
    overtimeHours: defaultInsertFieldState,
}

export const defaultScheduleUpdateFormState: ScheduleFormState = {
    insuranceDays: defaultUpdateFieldState,
    insuranceExperienceDays: defaultUpdateFieldState,
    incapacityDays: defaultUpdateFieldState,
    childcareDays: defaultUpdateFieldState,
    withoutInsuranceDays: defaultUpdateFieldState,
    unpaidLeaveDays: defaultUpdateFieldState,
    paidIncapacityDays: defaultUpdateFieldState,
    workedHours: defaultUpdateFieldState,
    overtimeHours: defaultUpdateFieldState,
}