import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";

export interface DepartmentTeamFormState extends FormState {
    teamName: FormFieldState,
    departmentId: FormFieldState
}

export const defaultDepTeamInsertFormState: DepartmentTeamFormState = {
    teamName: defaultInsertFieldState,
    departmentId: defaultInsertFieldState,
}

export const defaultDepTeamtUpdateFormState: DepartmentTeamFormState = {
    teamName: defaultUpdateFieldState,
    departmentId: defaultUpdateFieldState,
}