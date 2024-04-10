import { DepartmentFormState, defaultDepartmentInsertFormState } from "./department/DepartmentFormState";
import { PositionFormState, defualtPositionInsertFormState } from "./position/PositionFormState";

export interface PositionDepartmentState {
    positionInsert: PositionFormState,
    departmentInsert: DepartmentFormState
}

export const defaultPositionDepartmentState: PositionDepartmentState = {
    positionInsert: defualtPositionInsertFormState,
    departmentInsert: defaultDepartmentInsertFormState
}