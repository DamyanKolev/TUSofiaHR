import { Optional } from "@app-types/Optional";
import { DepartmentTeamView } from "../TableViews/DepartmentTeamView";

export interface DepartmentTeam {
    id: int;
    teamName: string,
    departmentId: int
    managerid: Optional<int>
}

export interface DepartmentTeamDTO {
    teamName: string,
    departmentId: int
    managerid: Optional<int>
}

export const defaultDepartmentTeamDTO: DepartmentTeamDTO = {
    teamName: "",
    departmentId: 0,
    managerid: null,
}

export const defaultDepTeamUpdateDTO: DepartmentTeam = {
    id: 0,
    teamName: "",
    departmentId: 0,
    managerid: null
}


export interface DepartmentTeamUpdateData {
    managerName: Optional<string>
    departmentName: string
}

export const defaultDepartmentTeamUpdateData: DepartmentTeamUpdateData = {
    managerName: "",
    departmentName: ""
}

export function createDepartmentTeamUpdateData(departmentView: DepartmentTeamView): DepartmentTeamUpdateData {
    return {
        managerName: departmentView.managerName,
        departmentName: departmentView.departmentName
    }
}