import { z, ZodType } from "zod"
import { CompanyEmployeeTaxInsertSchema, CompanyEmployeeTaxUpdateSchema } from "./CompanyEmployeeTaxSchema"
import { EndMonthDataInsert, EndMonthDataUpdate } from "../EndMonthData"
import { IncomeInsertSchema, IncomeUpdateSchema } from "./IncomeSchema"
import { ScheduleInsertSchema, ScheduleUpdateSchema } from "./ScheduleSchema"


export const EndMonthDataInsertSchema: ZodType<EndMonthDataInsert> = z.object(
    {
        income: IncomeInsertSchema,
        schedule: ScheduleInsertSchema,
        companyEmployeeTax: CompanyEmployeeTaxInsertSchema
    }
)


export const EndMonthDataUpdateSchema: ZodType<EndMonthDataUpdate> = z.object(
    {
        income: IncomeUpdateSchema,
        schedule: ScheduleUpdateSchema,
        companyEmployeeTax: CompanyEmployeeTaxUpdateSchema
    }
)