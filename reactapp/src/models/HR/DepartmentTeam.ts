import { Optional } from "@app-types/Optional";
import { DepartmentTeamView } from "@models/TableViews/DepartmentTeamView";
import { UpdateDTO } from "@models/UpdateDTO";

export interface DepartmentTeam {
    id: int;
    team_name: string,
    department_id: int
    manager_id: Optional<int>
}

export interface DepartmentTeamDTO {
    team_name: string,
    department_id: int
    manager_id: Optional<int>
}

export const defaultDepartmentTeamDTO: DepartmentTeamDTO = {
    team_name: "",
    department_id: 0,
    manager_id: null,
}

export const defaultDepTeamUpdateDTO: UpdateDTO<DepartmentTeamDTO> = {
    id: 0,
    update_data: defaultDepartmentTeamDTO
}


export interface DepartmentTeamUpdateData {
    manager_name: Optional<string>
    department_name: string
}

export const defaultDepartmentTeamUpdateData: DepartmentTeamUpdateData = {
    manager_name: "",
    department_name: ""
}

export function createDepartmentTeamUpdateData(departmentView: DepartmentTeamView): DepartmentTeamUpdateData {
    return {
        manager_name: departmentView.manager_name,
        department_name: departmentView.department_name
    }
}