import { z, ZodType } from "zod"
import { Schedule, ScheduleInsert } from "../Schedule"


export const ScheduleInsertSchema: ZodType<ScheduleInsert> = z.object(
    {
        employeeId: z.number().positive(), 
        insuranceDays: z.number().nonnegative(),
        insuranceExperienceDays: z.number().nonnegative(),
        incapacityDays: z.number().nonnegative(),
        childcareDays: z.number().nonnegative(),
        withoutInsuranceDays: z.number().nonnegative(),
        unpaidLeaveDays: z.number().nonnegative(),
        paidIncapacityDays: z.number().nonnegative(),
        workedHours: z.number().nonnegative(),
        overtimeHours: z.number().nonnegative(),
    }
)


export const ScheduleUpdateSchema: ZodType<Schedule> = z.object(
    {
        id: z.number().nonnegative(),
        employeeId: z.number().positive(), 
        insuranceDays: z.number().nonnegative(),
        insuranceExperienceDays: z.number().nonnegative(),
        incapacityDays: z.number().nonnegative(),
        childcareDays: z.number().nonnegative(),
        withoutInsuranceDays: z.number().nonnegative(),
        unpaidLeaveDays: z.number().nonnegative(),
        paidIncapacityDays: z.number().nonnegative(),
        workedHours: z.number().nonnegative(),
        overtimeHours: z.number().nonnegative(),
    }
)