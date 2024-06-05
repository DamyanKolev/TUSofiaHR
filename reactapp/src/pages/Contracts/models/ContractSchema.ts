import { z, ZodType } from "zod"
import { Contract, ContractInsertDTO } from "./Contract"


export const ContractInsertSchema: ZodType<ContractInsertDTO> = z.object(
    {
        workingWage: z.string().nullable(),
        workTime: z.number().positive().nullable(),
        annualLeave: z.number().positive().nullable(),
        additionalClause: z.string().nullable(),
        conclusionDate: z.string().nullable(),
        executionDate: z.string().min(1, {message: "Полето е задължително"}),
        contractTerm: z.string().nullable(),
        additionalAgreementDate: z.string().nullable(),
        contractTypeId: z.number().positive(),
        sysPositionId: z.number().positive().nullable(),
        sysIconomicActivityId: z.number().positive().nullable(),
        documentTypeId: z.number().positive(),
        companyEic: z.string().min(1, {message: "Полето е задължително"}),
        contractId: z.number().positive().nullable(),
        sysAdministrativeTerritoryId: z.number().positive().nullable(),
        codeCorection: z.number().positive(),
        isAnnex: z.boolean(),
        article62Flag: z.boolean(),
    }
)


export const ContractUpdateSchema: ZodType<Contract> = z.object(
    {
        id: z.number().nonnegative(),
        workingWage: z.string().nullable(),
        workTime: z.number().positive().nullable(),
        annualLeave: z.number().positive().nullable(),
        conclusionDate: z.string().nullable(),
        executionDate: z.string().min(1, {message: "Полето е задължително"}),
        contractTerm: z.string().nullable(),
        additionalAgreementDate: z.string().nullable(),
        terminationDate: z.string().nullable(),
        changeDate: z.string().nullable(),
        contractTypeId: z.number().positive(),
        sysPositionId:z.number().positive().nullable(),
        sysIconomicActivityId: z.number().positive().nullable(),
        documentTypeId: z.number().positive(),
        terminationTypeId: z.number().positive().nullable(),
        sysAdministrativeTerritoryId: z.number().positive().nullable(),
        codeCorection: z.number().nonnegative(),
        isTerminate: z.boolean(),
        article62Flag: z.boolean(),
    }
)