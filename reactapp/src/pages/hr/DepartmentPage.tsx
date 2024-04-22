import { Bar, Button, ButtonDesign } from "@ui5/webcomponents-react";
import { CSSProperties, FC, Fragment, createContext, useState } from "react"
import SmartTable from "@components/Table/SmartTable";
import departmentColumns from "@models/TableColumns/DepartmentColumns";
import CreateDepartmentForm from "@components/Forms/department/CreateDepartmentForm";
import DailogSwitch from "@app-types/enums/DialogSwitch";
import UpdateDepartmentForm from "@components/Forms/department/UpdateDepartmentForm";
import { createPortal } from "react-dom";
import { TableRowState } from "@app-types/TableRowState";
import { DepartmentView } from "@/models/TableViews/DepartmentView";

export const DepartmentPageContext = createContext<TableRowState<DepartmentView> | undefined>(undefined);

const tableStyle: CSSProperties = {
    padding: "0 4rem 0 4rem",
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}

const DepartmentPage: FC = () => {
    const tableTitle = "Отдели"
    const tableURL = "/api/hr/departments"
    const [dialogSwitch, setDialogSwitch] = useState<DailogSwitch>(DailogSwitch.Close)
    const [selectedRow, setSelectedRow] = useState<DepartmentView>({} as DepartmentView);

    const dialogSwitchGetter = () => { return dialogSwitch}
    const dialogSwitchSetter = (dialogSwitch: DailogSwitch) => {setDialogSwitch(dialogSwitch)}

    const addOnClick = () => {
        setDialogSwitch(DailogSwitch.OpenInsertDialog)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setDialogSwitch(DailogSwitch.OpenUpdateDialog)
        setSelectedRow(row)
    }

    return (
        <DepartmentPageContext.Provider value={{selectedRow, setSelectedRow}}>
            <div className="flexible-columns ui5-content-density-compact">
                <SmartTable
                    style={tableStyle}
                    onRowClick={onRowClick}
                    columns={departmentColumns}
                    tableURL={tableURL}
                    title={tableTitle}
                    header={
                        <Fragment>
                            <Bar endContent={
                                <Fragment>
                                    <Button design={ButtonDesign.Transparent} onClick={addOnClick}>Добави</Button>
                                    {/* <Button design={ButtonDesign.Transparent}>Delete</Button> */}
                                </Fragment>
                            } />
                        </Fragment>
                    }
                />

                
                {createPortal(
                    <CreateDepartmentForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>,
                    document.body
                )}
                {createPortal(
                    <UpdateDepartmentForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>,
                    document.body
                )}
            </div>
        </DepartmentPageContext.Provider>
    )
}

export default DepartmentPage