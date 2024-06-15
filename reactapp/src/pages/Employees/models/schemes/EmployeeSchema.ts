import { z, ZodType } from "zod"
import { Employee, EmployeeInsertDTO } from "../Employee"


export const EmployeeInsertSchema: ZodType<EmployeeInsertDTO> = z.object(
    {
        firstName: z.string().min(1, {message: "Полето е задължително"}),
        middleName: z.string().min(1, {message: "Полето е задължително"}),
        surname: z.string().min(1, {message: "Полето е задължително"}),
        phoneNumber: z.string().min(1, {message: "Полето е задължително"}),
        companyEmployeeId: z.number().positive(),
        personalDataId: z.number().nonnegative(),
        departmentId: z.number().positive().nullable(),
        insuranceId: z.number().positive().nullable(),
        positionId: z.number().positive().nullable(),
    }
)


export const EmployeeUpdateSchema: ZodType<Employee> = z.object(
    {
        id: z.number().nonnegative(),
        firstName: z.string().min(1, {message: "Полето е задължително"}),
        middleName: z.string().min(1, {message: "Полето е задължително"}),
        surname: z.string().min(1, {message: "Полето е задължително"}),
        phoneNumber: z.string().min(1, {message: "Полето е задължително"}),
        companyEmployeeId: z.number().positive(),
        personalDataId: z.number().positive(),
        departmentId: z.number().positive().nullable(),
        insuranceId: z.number().positive().nullable(),
        positionId: z.number().positive().nullable()
    }
)