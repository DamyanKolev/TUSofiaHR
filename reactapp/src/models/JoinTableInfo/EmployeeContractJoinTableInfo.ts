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
        contentFields: ["firstName","middleName","surname"],
        headerText: "Служители",
        tableURL: "/api/hr/employee/page"
    },
    departmentId: {
        filterField: "departmentName",
        description: "departmentName",
        contentFields: ["departmentName"],
        headerText: "Служители",
        tableURL: "/api/hr/department/all"
    },
    positionId: {
        filterField: "positionName",
        description: "positionName",
        contentFields: ["positionName"],
        headerText: "Служители",
        tableURL: "/api/hr/position/all"
    },
}


export const employeeContractJoinTablesInfo:JoinTableInfo = {
    filterField: "firstName",
    description: "companyEmployeeId",
    contentFields: ["firstName","middleName","surname"],
    headerText: "Служители",
    tableURL: "/api/hr/employee/page"
}