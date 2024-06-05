import { z, ZodType } from "zod"
import { Department, DepartmentDTO } from "./Department"


export const DepartmentInsertSchema: ZodType<DepartmentDTO> = z.object(
    {
        departmentName: z.string().min(1, {message: "Полето е задължително"}),
        description: z.string().nullable(),
        managerId: z.number().positive().nullable(),
        parentId: z.number().positive().nullable(),
    }
)


export const DepartmentUpdateSchema: ZodType<Department> = z.object(
    {
        id:  z.number().nonnegative(),
        departmentName: z.string().min(1, {message: "Полето е задължително"}),
        description: z.string().nullable(),
        managerId: z.number().positive().nullable(),
        parentId: z.number().positive().nullable()
    }
)