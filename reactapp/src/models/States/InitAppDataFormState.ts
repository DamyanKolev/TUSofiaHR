import { DepartmentFormState, defaultDepartmentInsertFormState } from "./department/DepartmentFormState";
import { defaultDepTeamInsertFormState, DepartmentTeamFormState } from "./departmentTeam/DepartmentTeamFormState";
import { PositionFormState, defualtPositionInsertFormState } from "./position/PositionFormState";

export interface PositionDepartmentState {
    positionInsert: PositionFormState,
    departmentInsert: DepartmentFormState
    departmentTeamInsert: DepartmentTeamFormState

}

export const defaultPositionDepartmentState: PositionDepartmentState = {
    positionInsert: defualtPositionInsertFormState,
    departmentInsert: defaultDepartmentInsertFormState,
    departmentTeamInsert: defaultDepTeamInsertFormState 
}