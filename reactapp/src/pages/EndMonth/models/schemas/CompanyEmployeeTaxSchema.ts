import { z, ZodType } from "zod"
import { CompanyEmployeeTax, CompanyEmployeeTaxInsert } from "../CompanyEmployeeTax"
import { parseDateToISO } from "@/utils/parsers"


export const CompanyEmployeeTaxInsertSchema: ZodType<CompanyEmployeeTaxInsert> = z.object(
    {
        employeeId: z.number().positive(),
        sysPaymentTypeId: z.number().positive(),
        disbursementAccrualDate: z.string().min(1, {message: "Полето е задължително"}).transform((date) => {return parseDateToISO(date)}),
    }
)


export const CompanyEmployeeTaxUpdateSchema: ZodType<CompanyEmployeeTax> = z.object(
    {
        id: z.number().positive(),
        employeeId: z.number().positive(),
        sysPaymentTypeId: z.number().positive(),
        disbursementAccrualDate: z.string().min(1, {message: "Полето е задължително"}).transform((date) => {return parseDateToISO(date)}),
        creationDate: z.string().transform((date) => {return parseDateToISO(date)})
    }
)