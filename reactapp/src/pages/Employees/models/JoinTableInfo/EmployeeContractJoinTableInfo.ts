import { JoinTableInfo } from "@/models/JoinTableInfo/JoinTableInfo"


export interface EmployeeJoinTablesInfo {
    departmentId: JoinTableInfo,
    positionId: JoinTableInfo,
}


export const employeeJoinTableInfo:EmployeeJoinTablesInfo = {
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
        tableURL: "/api/hr/positions/all"
    },
}


export const employeeContractJoinTablesInfo:JoinTableInfo = {
    filterField: "firstName",
    description: "companyEmployeeId",
    contentFields: ["employeeName"],
    headerText: "Служители",
    tableURL: "/api/hr/employees/page"
}