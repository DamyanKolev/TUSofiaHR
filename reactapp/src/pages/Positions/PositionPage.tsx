import { Bar, Button, ButtonDesign } from "@ui5/webcomponents-react";
import { CSSProperties, FC, Fragment, createContext, useState } from "react"
import SmartTable from "@components/Table/SmartTable";
import positionColumns from "@/pages/Positions/models/PositionColumns";
import DailogSwitch from "@app-types/enums/DialogSwitch";
import { createPortal } from "react-dom";
import { TableRowState } from "@app-types/TableRowState";
import { PositionView } from "@/pages/Positions/models/PositionView";
import CreatePositionForm from "./components/CreatePositionForm";
import UpdatePositionForm from "./components/UpdatePositionForm";


export const PositionPageContext = createContext<TableRowState<PositionView> | undefined>(undefined);


const tableStyle: CSSProperties = {
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}


const PositionPage: FC = () => {
    const tableTile = "Позиции"
    const tableURL = "/api/hr/positions"
    const [dialogSwitch, setDialogSwitch] = useState<DailogSwitch>(DailogSwitch.Close)
    const [selectedRow, setSelectedRow] = useState<PositionView>({} as PositionView);

    const dialogSwitchGetter = () => { return dialogSwitch}
    const dialogSwitchSetter = (dialogSwitch: DailogSwitch) => {setDialogSwitch(dialogSwitch)}

    const addOnClick = () => {
        setDialogSwitch(DailogSwitch.OpenInsertDialog)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setSelectedRow(row)
        setDialogSwitch(DailogSwitch.OpenUpdateDialog)
    }

    return (
        <PositionPageContext.Provider value={{selectedRow, setSelectedRow}}>
            <div className="flexible-columns ui5-content-density-compact">
                <SmartTable
                    title={tableTile}
                    style={tableStyle}
                    onRowClick={onRowClick}
                    columns={positionColumns}
                    tableURL={tableURL}
                    header={
                        <Fragment>
                            <Bar endContent={
                            <Fragment>
                            <Button design={ButtonDesign.Transparent} onClick={addOnClick}>Добави</Button>
                            {/* <Button design={ButtonDesign.Transparent}>Delete</Button> */}
                        </Fragment>
                            }/>
                        </Fragment>
                    }
                />

                {createPortal(
                    <CreatePositionForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>,
                    document.body
                )}                    
                
                {createPortal(
                    <UpdatePositionForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>,
                    document.body
                )}   
            </div>
        </PositionPageContext.Provider>
    )
}

export default PositionPage