import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import FlexibleColumn from "@/components/FlexibleColumn/FlexibleColumn";
import { FC } from "react";


const columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "workingWage",
        Header: "Заплата",
    },
    {
        accessor: "workTime",
        Header: "Часове на седмица",
    },
    {
        accessor: "conclusionDate",
        Header: "Дата на сключване",
    },
];


const Contract: FC = () => {
    const tableTitle = "Contracts";
    const tableName = "contract";
    const dataURL = "/api/contracts";


    return (
        <FlexibleColumn
            tableName={tableName}
            tableTitle={tableTitle}
            dataURL={dataURL}
            columns={columns}
        />
    );
};

export default Contract;