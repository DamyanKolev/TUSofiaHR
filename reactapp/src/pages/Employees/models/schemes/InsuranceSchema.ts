import { z, ZodType } from "zod"
import { Insurance, InsuranceDTO } from "../Insurance"


export const InsuranceInsertSchema: ZodType<InsuranceDTO> = z.object(
    {
        dooWithouthTzpbInsurer: z.string().min(1, {message: "Полето е задължително"}),
        dooWithouthTzpbEmployee: z.string().min(1, {message: "Полето е задължително"}),
        healthInsurance: z.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceArticle40: z.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceInsurer: z.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceEmployee: z.string().min(1, {message: "Полето е задължително"}),
        teacherPensionFund: z.string().min(1, {message: "Полето е задължително"}),
        professionalPensionFund: z.string().min(1, {message: "Полето е задължително"}),
        universalPensionInsurer: z.string().min(1, {message: "Полето е задължително"}),
        universalPensionEmployee: z.string().min(1, {message: "Полето е задължително"}),
        sysInsuranceTypeId: z.number().positive(),
    }
)


export const InsuranceUpdateSchema: ZodType<Insurance> = z.object(
    {
        id: z.number().nonnegative(),
        dooWithouthTzpbInsurer: z.string().min(1, {message: "Полето е задължително"}),
        dooWithouthTzpbEmployee: z.string().min(1, {message: "Полето е задължително"}),
        healthInsurance: z.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceArticle40: z.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceInsurer: z.string().min(1, {message: "Полето е задължително"}),
        healthInsuranceEmployee: z.string().min(1, {message: "Полето е задължително"}),
        teacherPensionFund: z.string().min(1, {message: "Полето е задължително"}),
        professionalPensionFund: z.string().min(1, {message: "Полето е задължително"}),
        universalPensionInsurer: z.string().min(1, {message: "Полето е задължително"}),
        universalPensionEmployee: z.string().min(1, {message: "Полето е задължително"}),
        sysInsuranceTypeId: z.number().positive(),
    }
)