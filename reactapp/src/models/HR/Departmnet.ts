import { Optional } from "@/types/Optional";
import { DepartmentView } from "../TableViews/DepartmentView";

export interface Department {
    id: int;
    departmentName: string,
    description: Optional<string>
    managerId: Optional<string>
}

export interface DepartmentDTO {
    departmentName: string,
    description: Optional<string>
    managerId: Optional<string>
}

export const defaultDepartmentDTO: DepartmentDTO = {
    departmentName: "",
    description: null,
    managerId: null
}

export const defaultDepartmentUpdateDTO: Department = {
    id: 0,
    departmentName: "",
    description: null,
    managerId: null
}

export interface DepartmentUpdateData {
    managerName: Optional<string>
}

export const defaultDepartmentUpdateData: DepartmentUpdateData = {
    managerName: "",
}

export function createDepartmentUpdateData(departmentView: DepartmentView): DepartmentUpdateData {
    return {
        managerName: departmentView.managerName,
    }
}