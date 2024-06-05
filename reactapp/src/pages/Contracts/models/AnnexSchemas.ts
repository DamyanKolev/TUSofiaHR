import { z, ZodType } from "zod"
import { AnnexInsertDTO } from "./Annex"
import { parseDateToISO } from "@/utils/parsers"

export const AnnexInsertSchema: ZodType<AnnexInsertDTO> = z.object(
    {
        workingWage: z.string().min(1, {message: "Полето е задължително"}).transform((value, ctx) => {
            const parsedValue = Number.parseFloat(value)
            if (Number.isNaN(parsedValue)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:"Невалидно въведена заплата",
                })
            }
            return value
        }).nullable(),
        workTime: z.coerce.number().positive().nullable(),
        annualLeave: z.coerce.number().positive().nullable(),
        additionalClause: z.string().nullable(),
        conclusionDate: z.string().min(1, "Полето е задължително").transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        }),
        executionDate: z.string().min(1, "Полето е задължително").transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        }),
        contractTerm: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return null
            }
            
        }).nullable(),
        additionalAgreementDate: z.string().min(1, "Полето е задължително").transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        }),
        contractTypeId: z.number().positive(),
        sysPositionId: z.number().positive().nullable(),
        sysIconomicActivityId: z.number().positive().nullable(),
        documentTypeId: z.number().positive(),
        companyEic: z.coerce.string(),
        contractId: z.number().positive().nullable().nullable(),
        sysAdministrativeTerritoryId: z.number().positive().nullable(),
        codeCorection: z.number().nonnegative(),
        isAnnex: z.boolean(),
        article62Flag: z.boolean(),
    }
)