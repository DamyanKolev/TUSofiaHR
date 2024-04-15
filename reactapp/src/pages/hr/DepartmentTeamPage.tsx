import DailogSwitch from "@app-types/enums/DialogSwitch";
import { TableRowState } from "@app-types/TableRowState";
import CreateDepTeamForm from "@components/Forms/departmentTeam/CreateDepTeamForm";
import UpdateDepTeamForm from "@components/Forms/departmentTeam/UpdateDepTeamForm";
import SmartTable from "@components/Table/SmartTable";
import departmentTeamColumns from "@models/TableColumns/DepartmentTeamColumns";
import { DepartmentTeamView } from "@models/TableViews/DepartmentTeamView";
import { Bar, Button, ButtonDesign } from "@ui5/webcomponents-react";
import { createContext, CSSProperties, FC, Fragment, useState } from "react";
import { createPortal } from "react-dom";


export const DepartmentTeamPageContext = createContext<TableRowState<DepartmentTeamView> | undefined>(undefined);

const tableStyle: CSSProperties = {
    padding: "0 4rem 0 4rem",
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}

const DepartmentTeamPage:FC = () => {
    const tableTitle = "Екипи"
    const tableURL = "/api/hr/department-team"
    const [dialogSwitch, setDialogSwitch] = useState<DailogSwitch>(DailogSwitch.Close)
    const [selectedRow, setSelectedRow] = useState<DepartmentTeamView>({} as DepartmentTeamView);

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
        <DepartmentTeamPageContext.Provider value={{selectedRow, setSelectedRow}}>
            <div className="flexible-columns ui5-content-density-compact">
                <SmartTable
                    style={tableStyle}
                    onRowClick={onRowClick}
                    columns={departmentTeamColumns}
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
                    <CreateDepTeamForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>,
                    document.body
                )}
                {createPortal(
                    <UpdateDepTeamForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>,
                    document.body
                )}
            </div>
        </DepartmentTeamPageContext.Provider>
    )
}


export default DepartmentTeamPage