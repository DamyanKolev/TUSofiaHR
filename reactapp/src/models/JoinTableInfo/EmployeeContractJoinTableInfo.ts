import { JoinTableInfo } from "./JoinTableInfo";


export interface EmployeeJoinTablesInfo {
    managerId: JoinTableInfo,
    departmentId: JoinTableInfo,
    positionId: JoinTableInfo,
}


export const employeeJoinTableInfo:EmployeeJoinTablesInfo = {
    managerId: {
        filterField: "first_name",
        description: "company_employee_id",
        contentFields: ["first_name","middle_name","surname"],
        headerText: "Служители",
        tableURL: "/backend/api/hr/employee/page"
    },
    departmentId: {
        filterField: "department_name",
        description: "department_name",
        contentFields: ["department_name"],
        headerText: "Служители",
        tableURL: "/backend/api/hr/department/select-all"
    },
    positionId: {
        filterField: "position_name",
        description: "position_name",
        contentFields: ["position_name"],
        headerText: "Служители",
        tableURL: "/backend/api/hr/position/select-all"
    },
}


export const employeeContractJoinTablesInfo:JoinTableInfo = {
    filterField: "first_name",
    description: "company_employee_id",
    contentFields: ["first_name","middle_name","surname"],
    headerText: "Служители",
    tableURL: "/backend/api/hr/employee/page"
}