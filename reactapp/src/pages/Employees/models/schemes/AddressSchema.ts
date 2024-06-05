import { z, ZodType } from "zod"
import { Address, AddressDTO } from "../Address"


export const AddressInsertSchema: ZodType<AddressDTO> = z.object(
    {
        district: z.string().min(1, {message: "Полето е задължително"}),
        municipilaty: z.string().min(1, {message: "Полето е задължително"}),
        region: z.string().min(1, {message: "Полето е задължително"}),
        populatedPlace: z.string().min(1, {message: "Полето е задължително"}),
        streetAddress: z.string().min(1, {message: "Полето е задължително"}),
        postalCode: z.string().min(1, {message: "Полето е задължително"}).transform((value, ctx) => {
            const parsedValue = Number.parseInt(value)
            if (Number.isNaN(parsedValue)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:"Невалиден пощенски код",
                })
            }
            return value
        }),
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
        postalCode: z.string().min(1, {message: "Полето е задължително"}).transform((value, ctx) => {
            const parsedValue = Number.parseInt(value)
            if (Number.isNaN(parsedValue)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:"Невалиден пощенски код",
                })
            }
            return value
        }),
    }
)