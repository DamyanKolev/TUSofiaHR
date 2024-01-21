import { Bar, Button, ButtonDesign } from "@ui5/webcomponents-react";
import { CSSProperties, FC, Fragment, createContext, useState } from "react"
import SmartTable from "@components/Table/SmartTable";
import PageBar from "@components/Bars/PageBar";
import departmentColumns from "@models/TableColumns/DepartmentColumns";
import CreateDepartmentForm from "@components/Forms/department/CreateDepartmentForm";
import DailogSwitch from "@app-types/DialogSwitch";
import UpdateDepartmentForm from "@components/Forms/department/UpdateDepartmentForm";
import { Department } from "@models/HR/Departmnet";

const defaultRow = {} as Department
export const DepartmentPageContext = createContext<Department>(defaultRow);

const tableStyle: CSSProperties = {
    padding: "0 4rem 0 4rem",
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}

const DepartmentPage: FC = () => {
    const tableTitle = "Отдели"
    const tableURL = "/api/departments"
    const [dialogSwitch, setDialogSwitch] = useState<DailogSwitch>(DailogSwitch.Close)
    const [selectedRow, setSelectedRow] = useState<Department>(defaultRow);

    const dialogSwitchGetter = () => { return dialogSwitch}
    const dialogSwitchSetter = (dialogSwitch: DailogSwitch) => {setDialogSwitch(dialogSwitch)}

    const addOnClick = () => {
        setDialogSwitch(DailogSwitch.OpenInsertDialog)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setSelectedRow(row);
        setDialogSwitch(DailogSwitch.OpenUpdateDialog)
    }

    return (
        <DepartmentPageContext.Provider value={selectedRow}>
            <div className="flexible-columns ui5-content-density-compact">
                <PageBar title={tableTitle} />
                <SmartTable
                    style={tableStyle}
                    onRowClick={onRowClick}
                    columns={departmentColumns}
                    tableURL={tableURL}
                    header={
                        <Fragment>
                            <Bar endContent={
                                <Fragment>
                                    <Button design={ButtonDesign.Transparent} onClick={addOnClick}>Add</Button>
                                    <Button design={ButtonDesign.Transparent}>Delete</Button>
                                </Fragment>
                            } />
                        </Fragment>
                    }
                />
                <CreateDepartmentForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>
                <UpdateDepartmentForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>
            </div>
        </DepartmentPageContext.Provider>
    )
}

export default DepartmentPage