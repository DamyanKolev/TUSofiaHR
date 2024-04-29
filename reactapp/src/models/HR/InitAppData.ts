import { DepartmentDTO, defaultDepartmentDTO } from "./Departmnet";
import { PositionDTO, defaultPositionDTO } from "./Position";

export interface InitAppData {
    positionInsert: PositionDTO,
    departmentInsert: DepartmentDTO
}

export const defaultInitAppData: InitAppData = {
    positionInsert: defaultPositionDTO,
    departmentInsert: defaultDepartmentDTO,
}