import { z, ZodType } from "zod"
import { Contract, ContractInsertDTO } from "./Contract"
import { parseDateToISO } from "@/utils/parsers"


export const ContractInsertSchema: ZodType<ContractInsertDTO> = z.object(
    {
        workingWage: z.string().nullable(),
        workTime: z.coerce.number().positive().nullable(),
        annualLeave: z.coerce.number().positive().nullable(),
        additionalClause: z.string().nullable(),
        conclusionDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
        }).nullable(),
        executionDate: z.string().transform((date) => {
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
                return ""
            }
            
        }).nullable(),
        additionalAgreementDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
        }).nullable(),
        contractTypeId: z.number().positive(),
        sysPositionId: z.number().positive().nullable(),
        sysIconomicActivityId: z.number().positive().nullable(),
        documentTypeId: z.number().positive(),
        companyEic: z.string().min(1, {message: "Полето е задължително"}),
        contractId: z.number().positive().nullable(),
        sysAdministrativeTerritoryId: z.number().positive().nullable(),
        codeCorection: z.number().nonnegative(),
        isAnnex: z.boolean(),
        article62Flag: z.boolean(),
    }
)


export const ContractUpdateSchema: ZodType<Contract> = z.object(
    {
        id: z.number().nonnegative(),
        workingWage: z.coerce.string().nullable(),
        workTime: z.coerce.number().positive().nullable(),
        annualLeave: z.number().positive().nullable(),
        additionalClause: z.string().nullable(),
        conclusionDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        }).nullable(),
        executionDate: z.string().transform((date) => {
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
                return ""
            }
            
        }).nullable(),
        additionalAgreementDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        }).nullable(),
        terminationDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        }).nullable(),
        changeDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        }).nullable(),
        contractTypeId: z.number().positive(),
        sysPositionId:z.number().positive().nullable(),
        sysIconomicActivityId: z.number().positive().nullable(),
        documentTypeId: z.number().positive(),
        companyEic: z.string().min(1, {message: "Полето е задължително"}),
        terminationTypeId: z.number().positive().nullable(),
        sysAdministrativeTerritoryId: z.number().positive().nullable(),
        codeCorection: z.number().nonnegative(),
        isTerminate: z.boolean(),
        article62Flag: z.boolean(),
        isAnnex: z.boolean(),
        creationDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return ""
            }
            
        })
    }
)