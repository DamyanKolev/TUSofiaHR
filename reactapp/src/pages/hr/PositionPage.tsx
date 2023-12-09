import { AnalyticalTableColumnDefinition, FlexBox } from "@ui5/webcomponents-react";
import { FC, Fragment } from "react"
import SmartTable from "@components/Table/SmartTable";
import PageBar from "@/components/Bars/PageBar";
import CreatePositionForm from "../../components/Forms/Create/CreatePositionForm";
import { FlexBoxAlignItems } from "@ui5/webcomponents-react/wrappers";


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
            <FlexBox alignItems={FlexBoxAlignItems.Center} >
                <SmartTable
                    columns={columns}
                    dataURL={dataURL}
                />
                {/*<CreatePositionForm />*/}
            </FlexBox>
        </Fragment>
    )
}

export default PositionPage