import { DepartmentFormState, defaultDepartmentInsertFormState } from "./department/DepartmentFormState";
import { defaultDepTeamInsertFormState, DepartmentTeamFormState } from "./departmentTeam/DepartmentTeamFormState";
import { PositionFormState, defualtPositionInsertFormState } from "./position/PositionFormState";

export interface InitAppDataFormState {
    positionInsert: PositionFormState,
    departmentInsert: DepartmentFormState
    departmentTeamInsert: DepartmentTeamFormState
}

export const defaultInitAppDataFormState: InitAppDataFormState = {
    positionInsert: defualtPositionInsertFormState,
    departmentInsert: defaultDepartmentInsertFormState,
    departmentTeamInsert: defaultDepTeamInsertFormState 
}