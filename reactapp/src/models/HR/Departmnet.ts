export interface Department {
    id: int;
    departmentName: string,
}

export interface DepartmentDTO {
    departmentName: string,
}

export const defualtDepartment: Department = {
    id: 0,
    departmentName: "",
}

export const defualtDepartmentDTO: DepartmentDTO = {
    departmentName: "",
}
