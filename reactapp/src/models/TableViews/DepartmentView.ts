import { Optional } from "@app-types/Optional"

export interface DepartmentView {
    id: int
    departmentName: string
    managerName: Optional<string>
    description: string
}