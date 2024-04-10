export interface Department {
    id: int;
    departmentName: string,
}

export interface DepartmentDTO {
    departmentName: string,
}

export const defaultDepartmentDTO: DepartmentDTO = {
    departmentName: ""
}

export const defaultDepartmentUpdateDTO: Department = {
    id: 0,
    departmentName: ""
}