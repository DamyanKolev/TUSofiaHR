import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";

export const employeeColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "first_name",
        Header: "Име",
    },
    {
        accessor: "middle_name",
        Header: "Фамилия",
    },
    {
        accessor: "surname",
        Header: "Презиме",
    },
    {
        accessor: "working_wage",
        Header: "Работна заплата",
    },
    {
        accessor: "company_employee_id",
        Header: "Фирмено ID",
    },
    {
        accessor: "manager_first_name",
        Header: "Мениджър",
    },
    {
        accessor: "department_name",
        Header: "Отдел",
    },
    {
        accessor: "position_name",
        Header: "Фирмена позиция",
    },
    {
        accessor: "state_position_name",
        Header: "Законова позиция",
    },
]