import { z, ZodType } from "zod"
import { Position, PositionDTO } from "./Position"


export const PositionInsertSchema: ZodType<PositionDTO> = z.object(
    {
        positionName: z.string().min(1, {message: "Полето е задължително"}),
        description: z.string().nullable(),
        sysPositionId: z.number().positive(),
    }
)


export const PositionUpdateSchema: ZodType<Position> = z.object(
    {
        id: z.number().nonnegative(),
        positionName: z.string().min(1, {message: "Полето е задължително"}),
        description: z.string().nullable(),
        sysPositionId: z.number().positive(),
    }
)