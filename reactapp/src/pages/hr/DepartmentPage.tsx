import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { FC, Fragment } from "react"
import SmartTable from "@components/Table/SmartTable";
import PageBar from "@/components/Bars/PageBar";


const columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "departmentName",
        Header: "�����",
    },
];



const PositionPage: FC = () => {
    const tableTile = "������"
    const dataURL = "/api/departments"


    return (
        <Fragment>
            <PageBar title={tableTile} />
            <SmartTable
                columns={columns}
                dataURL={dataURL}
            />
        </Fragment>
    )
}

export default PositionPage