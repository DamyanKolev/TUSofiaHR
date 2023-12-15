import { AnalyticalTableColumnDefinition, Bar, Button, ButtonDesign } from "@ui5/webcomponents-react";
import { FC, Fragment } from "react"
import SmartTable from "@components/Table/SmartTable";
import PageBar from "@/components/Bars/PageBar";
import CreateDepartmentForm from "../../components/Forms/Create/CreateDepartmentForm";


const columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "departmentName",
        Header: "Отдел",
    },
];



const DepartmentPage: FC = () => {
    const tableTile = "Отдели"
    const dataURL = "/api/departments"

    return (
        <Fragment>
            <PageBar title={tableTile} />
            <SmartTable
                columns={columns}
                dataURL={dataURL}
                header={
                    <Fragment>
                        <Bar endContent={
                            <Fragment>
                                <Button design={ButtonDesign.Transparent}>Add</Button>
                                <Button design={ButtonDesign.Transparent}>Edit</Button>
                                <Button design={ButtonDesign.Transparent}>Delete</Button>
                            </Fragment>
                        } />
                    </Fragment>
                }
            />
            <CreateDepartmentForm/>
        </Fragment>
    )
}

export default DepartmentPage