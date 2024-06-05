import { defaultPositionDTO, PositionDTO } from "@/pages/Positions/models/Position";
import { DepartmentDTO, defaultDepartmentDTO } from "../../pages/Departments/models/Department";

export interface InitAppData {
    positionInsert: PositionDTO,
    departmentInsert: DepartmentDTO
}

export const defaultInitAppData: InitAppData = {
    positionInsert: defaultPositionDTO,
    departmentInsert: defaultDepartmentDTO,
}