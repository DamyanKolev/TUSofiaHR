import { Optional } from "@app-types/Optional"

export interface DepartmentView {
    id: int
    departmentName: string
    managerName: Optional<string>
    description: Optional<string>
    parentDepartmentName: Optional<string>
    managerId: int,
    parentId: int
}