import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";

const positionColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "positionName",
        Header: "Фирмена длъжност",
    },
    {
        accessor: "description",
        Header: "Описание",
    },
    {
        accessor: "statePositionName",
        Header: "Законова длъжност",
    },
    {
        accessor: "nkpd",
        Header: "Код на длъжност",
    },
];

export default positionColumns