import { JoinTableInfo } from "./JoinTableInfo";


export interface DepartmentJoinTablesInfo {
    managerId: JoinTableInfo,
    parentId: JoinTableInfo,
}


export const departmentJoinTableInfo:DepartmentJoinTablesInfo = {
    managerId: {
        filterField: "first_name",
        description: "employee_name",
        contentFields: ["position_name"],
        headerText: "Служители",
        tableURL: "/api/hr/employees/page"
    },
    parentId: {
        filterField: "department_name",
        description: "department_name",
        contentFields: ["department_name"],
        headerText: "Отдел",
        tableURL: "/api/hr/departments/all"
    },
}
