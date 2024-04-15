import { defaultDepartmentTeamDTO, DepartmentTeamDTO } from "./DepartmentTeam";
import { DepartmentDTO, defaultDepartmentDTO } from "./Departmnet";
import { PositionDTO, defaultPositionDTO } from "./Position";

export interface InitAppData {
    positionInsert: PositionDTO,
    departmentInsert: DepartmentDTO
    departmentTeamInsert: DepartmentTeamDTO
}

export const defaultInitAppData: InitAppData = {
    positionInsert: defaultPositionDTO,
    departmentInsert: defaultDepartmentDTO,
    departmentTeamInsert: defaultDepartmentTeamDTO
}