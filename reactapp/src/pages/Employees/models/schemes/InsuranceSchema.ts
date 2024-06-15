import { z, ZodType } from "zod"
import { Insurance, InsuranceDTO } from "../Insurance"


export const InsuranceInsertSchema: ZodType<InsuranceDTO> = z.object(
    {
        dooWithouthTzpbInsurer: z.coerce.string().min(1, {message: "Полето е задължително"}),
        dooWithouthTzpbEmployee: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsurance: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceArticle40: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceInsurer: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceEmployee: z.coerce.string().min(1, {message: "Полето е задължително"}),
        teacherPensionFund: z.coerce.string().min(1, {message: "Полето е задължително"}),
        professionalPensionFund: z.coerce.string().min(1, {message: "Полето е задължително"}),
        universalPensionInsurer: z.coerce.string().min(1, {message: "Полето е задължително"}),
        universalPensionEmployee: z.coerce.string().min(1, {message: "Полето е задължително"}),
        insuranceTypeId: z.number().positive(),
    }
)


export const InsuranceUpdateSchema: ZodType<Insurance> = z.object(
    {
        id: z.number().positive(),
        dooWithouthTzpbInsurer: z.coerce.string().min(1, {message: "Полето е задължително"}),
        dooWithouthTzpbEmployee: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsurance: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceArticle40: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceInsurer: z.coerce.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceEmployee: z.coerce.string().min(1, {message: "Полето е задължително"}),
        teacherPensionFund: z.coerce.string().min(1, {message: "Полето е задължително"}),
        professionalPensionFund: z.coerce.string().min(1, {message: "Полето е задължително"}),
        universalPensionInsurer: z.coerce.string().min(1, {message: "Полето е задължително"}),
        universalPensionEmployee: z.coerce.string().min(1, {message: "Полето е задължително"}),
        insuranceTypeId: z.number().positive(),
    }
)