import { z, ZodType } from "zod"
import { parseDateToISO } from "@/utils/parsers"
import { PersonalData, PersonalDataDTO } from "../PersonalData"
import Gender from "@/types/enums/Gender"

const identityTextRegex: RegExp = /^\d{10,10}$/


export const PersonalDataInsertSchema: ZodType<PersonalDataDTO> = z.object(
    {
        personalEmail: z.string().min(1, {message: "Полето е задължително"}).email("Невалиден email адрес"),
        workEmail: z.string().min(1, {message: "Полето е задължително"}).email("Невалиден email адрес"),
        identityText: z.string().refine((val) => identityTextRegex.test(val), {message: "Невалиден ЕГН" }),
        identityCode: z.coerce.number().nonnegative("Моля изберете опция"),
        birthDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return null
            }            
        }).nullable(),
        gender: z.nativeEnum(Gender).nullable(),
        personalIdNumber: z.string().nullable(),
        personalIdIssueDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return null
            }            
        }).nullable(),
        personalIdIssueBy: z.string().nullable(),
        addressId: z.number().nullable()
    }
)


export const PersonalDataUpdateSchema: ZodType<PersonalData> = z.object(
    {
        id: z.number().nonnegative(),
        personalEmail: z.string().min(1, {message: "Полето е задължително"}).email("Невалиден email адрес"),
        workEmail: z.string().min(1, {message: "Полето е задължително"}).email("Невалиден email адрес"),
        identityText: z.string().refine((val) => identityTextRegex.test(val), {message: "Невалиден ЕГН" }),
        identityCode: z.number().nonnegative("Моля изберете опция"),
        birthDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return null
            }            
        }).nullable(),
        gender: z.nativeEnum(Gender).nullable(),
        personalIdNumber: z.string().nullable(),
        personalIdIssueDate: z.string().transform((date) => {
            if (date != "") {
                return parseDateToISO(date)
            }
            else {
                return null
            }            
        }).nullable(),
        personalIdIssueBy: z.string().nullable(),
        addressId: z.number().nullable()
    }
)