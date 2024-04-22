import { JoinTableInfo } from "./JoinTableInfo";


export interface DepTeamJoinTablesInfo {
    departmentId: JoinTableInfo,
    managerId: JoinTableInfo,
}


export const depTeamJoinTableInfo:DepTeamJoinTablesInfo = {
    departmentId: {
        filterField: "departmentName",
        description: "departmentName",
        contentFields: ["departmentName"],
        headerText: "Служители",
        tableURL: "/api/hr/departments/all"
    },
    managerId: {
        filterField: "employeeName",
        description: "companyEmployeeId",
        contentFields: ["employeeName"],
        headerText: "Служители",
        tableURL: "/api/hr/employees/page"
    },
}
