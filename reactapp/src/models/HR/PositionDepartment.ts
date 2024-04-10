import { DepartmentDTO, defaultDepartmentDTO } from "./Departmnet";
import { PositionDTO, defaultPositionDTO } from "./Position";

export interface PositionDepartment {
    positionInsert: PositionDTO,
    departmentInsert: DepartmentDTO
}

export const defaultPositionDepartment: PositionDepartment = {
    positionInsert: defaultPositionDTO,
    departmentInsert: defaultDepartmentDTO
}