export interface Schedule {
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


export const createDefaultSchedule = (employeeId: int): Schedule => {
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