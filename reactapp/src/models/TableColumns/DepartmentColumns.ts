import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";

const departmentColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "departmentName",
        Header: "Отдел",
    },
    {
        accessor: "description",
        Header: "Описание",
    },
    {
        accessor: "managerName",
        Header: "Мениджър",
    },
    {
        accessor: "parentDepartmentName",
        Header: "Родителска Единица",
    },
];


export default departmentColumns