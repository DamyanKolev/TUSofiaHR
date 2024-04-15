import { Optional } from "@app-types/Optional"

export interface DepartmentTeamView {
    id: int
    teamName: string
    managerName: Optional<string>
    departmentName: string
}