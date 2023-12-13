import { AnalyticalTableColumnDefinition, Bar, Button, ButtonDesign, FlexBox } from "@ui5/webcomponents-react";
import { FC, Fragment, useState } from "react"
import SmartTable from "@components/Table/SmartTable";
import PageBar from "@/components/Bars/PageBar";
import CreatePositionForm from "@components/Forms/Create/CreatePositionForm";
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
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const isSuccessGetter = () => {
        return isSuccess
    }

    const isSuccessSetter = (value: boolean) => {
        setIsSuccess(value)
    }

    return (
        <Fragment>
            <PageBar title={tableTile} />
            <FlexBox alignItems={FlexBoxAlignItems.Center} >
                <SmartTable
                    columns={columns}
                    dataURL={dataURL}
                    isSuccessGetter={isSuccessGetter}
                    isSuccessSetter={isSuccessSetter }
                    header={
                        <Fragment>
                            <Bar endContent={
                                <Fragment>
                                    <Button design={ButtonDesign.Transparent}>Add</Button>
                                    <Button design={ButtonDesign.Transparent}>Edit</Button>
                                    <Button design={ButtonDesign.Transparent}>Delete</Button>
                                </Fragment>
                            }/>
                        </Fragment>
                    }
                />
                <CreatePositionForm isSuccessSetter={isSuccessSetter} />
            </FlexBox>
        </Fragment>
    )
}

export default PositionPage