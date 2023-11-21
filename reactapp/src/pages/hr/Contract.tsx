import { useState } from "react";
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import FlexibleColumn, { createFlexibleColumnProps } from "../../components/FlexibleColumn/FlexibleColumn";
import CreateContractForm from "../../components/forms/create-forms/CreateContractForm";
import UpdateContractForm from "../../components/forms/update-forms/UpdateContractForm";




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
    const [dataURL] = useState("/api/contracts");

    const flexibleColumnProps = createFlexibleColumnProps(UpdateContractForm({}), CreateContractForm({}), tableTitle, dataURL, columns)

    
    return (
        <FlexibleColumn
            flexibleColumnProps={flexibleColumnProps}
        />
    )
}