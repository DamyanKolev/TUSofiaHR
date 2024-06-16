import { z, ZodType } from "zod"
import { Address, AddressDTO } from "../Address"

const postalCodeRegex: RegExp = /^\d{4,4}$/


export const AddressInsertSchema: ZodType<AddressDTO> = z.object(
    {
        district: z.string().min(1, {message: "Полето е задължително"}),
        municipilaty: z.string().min(1, {message: "Полето е задължително"}),
        region: z.string().min(1, {message: "Полето е задължително"}),
        populatedPlace: z.string().min(1, {message: "Полето е задължително"}),
        streetAddress: z.string().min(1, {message: "Полето е задължително"}),
        postalCode: z.string().refine((val) => postalCodeRegex.test(val), {message: "Невалиден пощенски код" }),
    }
)


export const AddressUpdateSchema: ZodType<Address> = z.object(
    {
        id: z.number().nonnegative(),
        district: z.string().min(1, {message: "Полето е задължително"}),
        municipilaty: z.string().min(1, {message: "Полето е задължително"}),
        region: z.string().min(1, {message: "Полето е задължително"}),
        populatedPlace: z.string().min(1, {message: "Полето е задължително"}),
        streetAddress: z.string().min(1, {message: "Полето е задължително"}),
        postalCode: z.string().refine((val) => postalCodeRegex.test(val), {message: "Невалиден пощенски код" }),
    }
)