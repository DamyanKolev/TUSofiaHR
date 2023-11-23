import { useState } from "react";
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import FlexibleColumn from "../../components/FlexibleColumn/FlexibleColumn";




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

]

export default function Contract() {
    const [tableTitle] = useState("Contracts");
    const [tableName] = useState("contract");
    const [dataURL] = useState("/api/contracts");

    
    return (
        <FlexibleColumn tableName={tableName} tableTitle={tableTitle} dataURL={dataURL} columns={columns} />
    )
}