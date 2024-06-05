import { z, ZodType } from "zod"
import { InitAppData } from "../HR/InitAppData"
import { DepartmentInsertSchema } from "@/pages/Departments/models/DepartmentSchema"
import { PositionInsertSchema } from "@/pages/Positions/models/PositionSchema"


export const InitAppDataSchema: ZodType<InitAppData> = z.object(
    {
        positionInsert: PositionInsertSchema,
        departmentInsert: DepartmentInsertSchema
    }
)
