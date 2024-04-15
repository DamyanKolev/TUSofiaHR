

export interface Schedule {
    id: int,
    employeeId: int, 
    insuranceDays: int,
    insuranceExperienceDays: int,
    incapacityDays: int,
    childcareDays: int,
    withoutInsuranceDays: int,
    unpaidLeaveDays: int,
    paidIncapacityDays: int,
    workedHours: int,
    overtimeHours: int,
}


export interface ScheduleInsert {
    employeeId: int, 
    insuranceDays: int,
    insuranceExperienceDays: int,
    incapacityDays: int,
    childcareDays: int,
    withoutInsuranceDays: int,
    unpaidLeaveDays: int,
    paidIncapacityDays: int,
    workedHours: int,
    overtimeHours: int,
}


export const createDefaultScheduleInsert = (employeeId: int): ScheduleInsert => {
    return {
        employeeId: employeeId,
        insuranceDays: 0,
        insuranceExperienceDays: 0,
        incapacityDays: 0,
        childcareDays: 0,
        withoutInsuranceDays: 0,
        unpaidLeaveDays: 0,
        paidIncapacityDays: 0,
        workedHours: 0,
        overtimeHours: 0,
    }
}



export const defaultScheduleUpdate: Schedule = {
    id: 0,
    employeeId: 0, 
    insuranceDays: 0,
    insuranceExperienceDays: 0,
    incapacityDays: 0,
    childcareDays: 0,
    withoutInsuranceDays: 0,
    unpaidLeaveDays: 0,
    paidIncapacityDays: 0,
    workedHours: 0,
    overtimeHours: 0,
}
