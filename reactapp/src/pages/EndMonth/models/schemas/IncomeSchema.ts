import { z, ZodType } from "zod"
import { Income, IncomeInsert } from "../Income"
import { parseDateToISO } from "@/utils/parsers"


export const IncomeInsertSchema: ZodType<IncomeInsert> = z.object(
    {
        employeeId: z.number().nonnegative(),
        healtInsuranceArt40: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        totalInsurance: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        healthInsurance: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        grossRemuneration: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        bonusIncome: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        additionalIncome: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
    }
)


export const IncomeUpdateSchema: ZodType<Income> = z.object(
    {
        id: z.number().nonnegative(),
        employeeId: z.number().nonnegative(),
        healtInsuranceArt40: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        totalInsurance: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"})
            .refine((val) => Number.parseFloat(val) >= 933, {message: "Минималния осигурителен доход е 933 лв."}
        ),
        healthInsurance: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        grossRemuneration: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        bonusIncome: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        additionalIncome: z.coerce.string().min(1, {message: "Полето е задължително"})
            .refine((money) => !Number.isNaN(Number.parseFloat(money)), {message: "Невалидни данни, изисква се число"}
        ),
        creationDate: z.string().transform((date) => {return parseDateToISO(date)})
    }
)