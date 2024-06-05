import { z, ZodType } from "zod"
import { CompanyEmployeeTax, CompanyEmployeeTaxInsert } from "../CompanyEmployeeTax"


export const CompanyEmployeeTaxInsertSchema: ZodType<CompanyEmployeeTaxInsert> = z.object(
    {
        employeeId: z.number().positive(),
        sysPaymentTypeId: z.number().positive(),
        disbursementAccrualDate: z.string().min(1, {message: "Полето е задължително"}),
    }
)


export const CompanyEmployeeTaxUpdateSchema: ZodType<CompanyEmployeeTax> = z.object(
    {
        id: z.number().positive(),
        employeeId: z.number().positive(),
        sysPaymentTypeId: z.number().positive(),
        disbursementAccrualDate: z.string().min(1, {message: "Полето е задължително"}),
    }
)