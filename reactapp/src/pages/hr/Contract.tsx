import { useState } from "react";
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { createTableProps } from "../../components/SmartTable";
import FlexibleColumn, { createFlexibleColumnProps } from "../../components/FlexibleColumn/FlexibleColumn";
import CreateContractForm from "../../components/forms/create-forms/CreateContractForm";
import UpdateContractForm from "../../components/forms/update-forms/UpdateContractForm";




const columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "WorkingWage",
        Header: "Заплата",
    },
    {
        accessor: "WorkTime",
        Header: "Часове на седмица",
    },
    {
        accessor: "ConclusionDate",
        Header: "Дата на сключване",
    },

]

export default function Contract() {
    const [tableTitle] = useState("Contracts");
    const [dataURL] = useState("/api/contracts");

    const tableProps = createTableProps(dataURL, columns, tableTitle)
    const flexibleColumnProps = createFlexibleColumnProps(UpdateContractForm({}), CreateContractForm({}), tableProps)

    
    return (
        <FlexibleColumn
            flexibleColumnProps={flexibleColumnProps}
        />
    )
}