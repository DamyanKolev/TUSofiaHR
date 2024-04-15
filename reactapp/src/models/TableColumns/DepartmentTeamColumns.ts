import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";

const departmentTeamColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "teamName",
        Header: "Екип",
    },
    {
        accessor: "departmentName",
        Header: "Отдел",
    },
    {
        accessor: "managerName",
        Header: "Мениджър",
    },
];


export default departmentTeamColumns