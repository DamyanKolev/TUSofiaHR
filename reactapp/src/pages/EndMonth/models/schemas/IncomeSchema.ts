import { z, ZodType } from "zod"
import { Income, IncomeInsert } from "../Income"


export const IncomeInsertSchema: ZodType<IncomeInsert> = z.object(
    {
        employeeId: z.number().positive(),
        healtInsuranceArt40: z.string().min(1, {message: "Полето е задължително"}),
        totalInsurance: z.string().min(1, {message: "Полето е задължително"}),
        healthInsurance: z.string().min(1, {message: "Полето е задължително"}),
        grossRemuneration: z.string().min(1, {message: "Полето е задължително"}),
        bonusIncome: z.string().min(1, {message: "Полето е задължително"}),
        additionalIncome: z.string().min(1, {message: "Полето е задължително"}),
    }
)


export const IncomeUpdateSchema: ZodType<Income> = z.object(
    {
        id: z.number().nonnegative(),
        employeeId: z.number().positive(),
        healtInsuranceArt40: z.string().min(1, {message: "Полето е задължително"}),
        totalInsurance: z.string().min(1, {message: "Полето е задължително"}),
        healthInsurance: z.string().min(1, {message: "Полето е задължително"}),
        grossRemuneration: z.string().min(1, {message: "Полето е задължително"}),
        bonusIncome: z.string().min(1, {message: "Полето е задължително"}),
        additionalIncome: z.string().min(1, {message: "Полето е задължително"}),
    }
)