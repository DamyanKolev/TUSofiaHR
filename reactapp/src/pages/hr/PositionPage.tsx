import { Bar, Button, ButtonDesign } from "@ui5/webcomponents-react";
import { CSSProperties, FC, Fragment, createContext, useState } from "react"
import SmartTable from "@components/Table/SmartTable";
import PageBar from "@components/Bars/PageBar";
import CreatePositionForm from "@components/Forms/position/CreatePositionForm";
import positionColumns from "@models/TableColumns/PositionColumns";
import DailogSwitch from "@app-types/DialogSwitch";
import { Position } from "@models/HR/Position";
import UpdatePositionForm from "@components/Forms/position/UpdatePositionForm";


const defaultRow = {} as Position
export const PositionPageContext = createContext<Position>(defaultRow);


const tableStyle: CSSProperties = {
    padding: "0 4rem 0 4rem",
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}


const PositionPage: FC = () => {
    const tableTile = "Позиции"
    const tableURL = "/backend/api/hr/position"
    const [dialogSwitch, setDialogSwitch] = useState<DailogSwitch>(DailogSwitch.Close)
    const [isSelctedRow, setIsSelectedRow] = useState<boolean>(true)
    const [selectedRow, setSelectedRow] = useState<Position>(defaultRow);

    const dialogSwitchGetter = () => { return dialogSwitch}
    const dialogSwitchSetter = (dialogSwitch: DailogSwitch) => {setDialogSwitch(dialogSwitch)}

    const addOnClick = () => {
        setDialogSwitch(DailogSwitch.OpenInsertDialog)
    }

    const updateOnClick = () => {
        setDialogSwitch(DailogSwitch.OpenUpdateDialog)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setIsSelectedRow(false)
        setSelectedRow(row);
    }

    return (
        <PositionPageContext.Provider value={selectedRow}>
            <PageBar title={tableTile} />
            <SmartTable
                style={tableStyle}
                onRowClick={onRowClick}
                columns={positionColumns}
                tableURL={tableURL}
                header={
                    <Fragment>
                        <Bar endContent={
                         <Fragment>
                         <Button design={ButtonDesign.Transparent} onClick={addOnClick}>Add</Button>
                         <Button design={ButtonDesign.Transparent} disabled={isSelctedRow} onClick={updateOnClick}>Edit</Button>
                         <Button design={ButtonDesign.Transparent}>Delete</Button>
                     </Fragment>
                        }/>
                    </Fragment>
                }
            />                    
            <CreatePositionForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>
            <UpdatePositionForm dialogSwitchGetter={dialogSwitchGetter} dialogSwitchSetter={dialogSwitchSetter} tableURL={tableURL}/>
        </PositionPageContext.Provider>
    )
}

export default PositionPage