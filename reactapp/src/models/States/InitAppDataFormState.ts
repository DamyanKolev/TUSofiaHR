import { DepartmentFormState, defaultDepartmentInsertFormState } from "./department/DepartmentFormState";
import { PositionFormState, defualtPositionInsertFormState } from "./position/PositionFormState";

export interface InitAppDataFormState {
    positionInsert: PositionFormState,
    departmentInsert: DepartmentFormState
}

export const defaultInitAppDataFormState: InitAppDataFormState = {
    positionInsert: defualtPositionInsertFormState,
    departmentInsert: defaultDepartmentInsertFormState,
}