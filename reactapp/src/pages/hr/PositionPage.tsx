import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { FC, Fragment } from "react"
import SmartTable from "@components/Table/SmartTable";
import PageBar from "@/components/Bars/PageBar";


const columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "positionName",
        Header: "Позиция",
    },
    {
        accessor: "minSalary",
        Header: "Минимална заплата",
    },
    {
        accessor: "maxSalary",
        Header: "Максимална заплата",
    },
];



const PositionPage: FC = () => {
    const tableTile = "Позиции"
    const dataURL = "/api/positions"


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