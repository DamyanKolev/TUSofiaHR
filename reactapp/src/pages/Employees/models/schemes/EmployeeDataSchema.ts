import { z, ZodType } from "zod"
import { EmployeeInsertSchema, EmployeeUpdateSchema } from "./EmployeeSchema"
import { PersonalDataInsertSchema, PersonalDataUpdateSchema } from "./PersonalDataSchema"
import { InsuranceInsertSchema, InsuranceUpdateSchema } from "./InsuranceSchema"
import { EmployeeDataInsert, EmployeeDataUpdateDTO } from "../EmployeeData"
import { ContractInsertSchema, ContractUpdateSchema } from "@/pages/Contracts/models/ContractSchema"
import { AddressInsertSchema, AddressUpdateSchema } from "./AddressSchema"

export const EmployeeDataInsertSchema: ZodType<EmployeeDataInsert> = z.object(
    {
       employee: EmployeeInsertSchema,
       personalData: PersonalDataInsertSchema,
       contract: ContractInsertSchema.nullable(),
       insurance: InsuranceInsertSchema.nullable(),
       address: AddressInsertSchema
    }
)


export const EmployeeDataUpdateSchema: ZodType<EmployeeDataUpdateDTO> = z.object(
    {
       employee: EmployeeUpdateSchema.nullable(),
       personalData: PersonalDataUpdateSchema.nullable(),
       contract: ContractUpdateSchema.nullable(),
       insurance: InsuranceUpdateSchema.nullable(),
       address: AddressUpdateSchema.nullable()
    }
)