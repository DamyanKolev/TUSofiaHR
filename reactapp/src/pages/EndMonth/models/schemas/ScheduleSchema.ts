import { z, ZodType } from "zod"
import { Schedule, ScheduleInsert } from "../Schedule"
import { parseDateToISO } from "@/utils/parsers"


export const ScheduleInsertSchema: ZodType<ScheduleInsert> = z.object(
    {
        employeeId: z.coerce.number().positive(), 
        insuranceDays: z.coerce.number().nonnegative(),
        insuranceExperienceDays: z.coerce.number().nonnegative(),
        incapacityDays: z.coerce.number().nonnegative(),
        childcareDays: z.coerce.number().nonnegative(),
        withoutInsuranceDays: z.coerce.number().nonnegative(),
        unpaidLeaveDays: z.coerce.number().nonnegative(),
        paidIncapacityDays: z.coerce.number().nonnegative(),
        workedHours: z.coerce.number().nonnegative(),
        overtimeHours: z.coerce.number().nonnegative(),
    }
)


export const ScheduleUpdateSchema: ZodType<Schedule> = z.object(
    {
        id: z.coerce.number().nonnegative(),
        employeeId: z.coerce.number().positive(), 
        insuranceDays: z.coerce.number().nonnegative(),
        insuranceExperienceDays: z.coerce.number().nonnegative(),
        incapacityDays: z.coerce.number().nonnegative(),
        childcareDays: z.coerce.number().nonnegative(),
        withoutInsuranceDays: z.coerce.number().nonnegative(),
        unpaidLeaveDays: z.coerce.number().nonnegative(),
        paidIncapacityDays: z.coerce.number().nonnegative(),
        workedHours: z.coerce.number().nonnegative(),
        overtimeHours: z.coerce.number().nonnegative(),
        creationDate: z.string().transform((date) => {return parseDateToISO(date)})
    }
)