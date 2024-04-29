import { JoinTableInfo } from "./JoinTableInfo";


export interface DepartmentJoinTablesInfo {
    managerId: JoinTableInfo,
    parentId: JoinTableInfo,
}


export const departmentJoinTableInfo:DepartmentJoinTablesInfo = {
    managerId: {
        filterField: "firstName",
        description: "employeeName",
        contentFields: ["employeeName"],
        headerText: "Служители",
        tableURL: "/api/hr/employees/page"
    },
    parentId: {
        filterField: "departmentName",
        description: "departmentName",
        contentFields: ["departmentName"],
        headerText: "Отдел",
        tableURL: "/api/hr/departments/all"
    },
}
