export interface Department {
    id: int;
    department_name: string,
}

export interface DepartmentDTO {
    department_name: string,
}

export const defualtDepartmentDTO: DepartmentDTO = {} as Department