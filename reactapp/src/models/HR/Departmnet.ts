import { Optional } from "@/types/Optional";
import { DepartmentView } from "../TableViews/DepartmentView";

export interface Department {
    id: int;
    departmentName: string,
    description: Optional<string>
    managerId: Optional<int>
    parentId: Optional<int>
}

export interface DepartmentDTO {
    departmentName: string,
    description: Optional<string>
    managerId: Optional<int>
    parentId: Optional<int>
}

export const defaultDepartmentDTO: DepartmentDTO = {
    departmentName: "",
    description: null,
    managerId: null,
    parentId: null
}

export const defaultDepartmentUpdateDTO: Department = {
    id: 0,
    departmentName: "",
    description: null,
    managerId: null,
    parentId: null
}

export interface DepartmentUpdateData {
    managerName: Optional<string>
    parentDepartmentName: Optional<string>,
}

export const defaultDepartmentUpdateData: DepartmentUpdateData = {
    managerName: "",
    parentDepartmentName: "",
}

export function createDepartmentUpdateData(departmentView: DepartmentView): DepartmentUpdateData {
    return {
        managerName: departmentView.managerName,
        parentDepartmentName: departmentView.parentDepartmentName,
}
}