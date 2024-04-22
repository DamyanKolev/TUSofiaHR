import { JoinTableInfo } from "./JoinTableInfo";


export interface EmployeeJoinTablesInfo {
    managerId: JoinTableInfo,
    departmentId: JoinTableInfo,
    positionId: JoinTableInfo,
}


export const employeeJoinTableInfo:EmployeeJoinTablesInfo = {
    managerId: {
        filterField: "firstName",
        description: "companyEmployeeId",
        contentFields: ["employeeName"],
        headerText: "Служители",
        tableURL: "/api/hr/employees/page"
    },
    departmentId: {
        filterField: "departmentName",
        description: "departmentName",
        contentFields: ["departmentName"],
        headerText: "Служители",
        tableURL: "/api/hr/departments/all"
    },
    positionId: {
        filterField: "positionName",
        description: "positionName",
        contentFields: ["positionName"],
        headerText: "Служители",
        tableURL: "/api/hr/positions/select-all"
    },
}


export const employeeContractJoinTablesInfo:JoinTableInfo = {
    filterField: "firstName",
    description: "companyEmployeeId",
    contentFields: ["employeeName"],
    headerText: "Служители",
    tableURL: "/api/hr/employees/page"
}