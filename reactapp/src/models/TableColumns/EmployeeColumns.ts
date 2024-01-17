import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";

export const employeeColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "employeeName",
        Header: "Име на Служителя",
    },
    {
        accessor: "email",
        Header: "E-mail",
    },
    {
        accessor: "ТphoneNumber",
        Header: "Телефонен номер",
    },
    {
        accessor: "managerName",
        Header: "Име на Мениджър",
    },
    {
        accessor: "departmentName",
        Header: "Отдел",
    },
    {
        accessor: "positionName",
        Header: "Фирмена позиция",
    },
]