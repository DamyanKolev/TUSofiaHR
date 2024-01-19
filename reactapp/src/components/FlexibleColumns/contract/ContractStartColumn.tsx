import { CSSProperties, FC, Fragment, useState } from 'react';
import { AnalyticalTableColumnDefinition, Bar, BarDesign, Button, ButtonDesign,FCLLayout} from '@ui5/webcomponents-react';
import SmartTable from '../../Table/SmartTable';
import PageBar from '../../Bars/PageBar';
import "@ui5/webcomponents-icons/excel-attachment"
import TerminateContract from '@components/Forms/contract/TerminateContractForm';
import { createPortal } from 'react-dom';


const tableStyle: CSSProperties = {
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}


interface StartColumnProps {
    tableURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
    handleLayoutState: (layout: FCLLayout) => void,
    onRowClick: (event: any) => void,
}


const ContractStartColumn: FC<StartColumnProps> = ({ tableURL, columns, tableTitle, handleLayoutState, onRowClick}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    const createOnClick = () => { 
        handleLayoutState(FCLLayout.EndColumnFullScreen) 
    }
    
    const terminateButtonOnClick = () => {
        setOpen(true)
    }

    const setDisabledSetter = (disablded: boolean): void => {
        setDisabled(disablded)
    }

    const setOpenSetter = (open: boolean): void => {
        setOpen(open)
    }

    return (
        <Fragment>
            <PageBar title={tableTitle} />
            <SmartTable
                style={tableStyle}
                tableURL={tableURL}
                columns={columns}
                onRowClick={onRowClick}
                header={
                    <Bar 
                        design={BarDesign.Subheader}
                        endContent={
                            <Fragment>
                                <Button design={ButtonDesign.Transparent} onClick={terminateButtonOnClick} disabled={disabled}>Терминиране</Button>
                                <Button design={ButtonDesign.Transparent} onClick={createOnClick}>Създай</Button>
                                <Button icon="excel-attachment"  design={ButtonDesign.Transparent}/>
                            </Fragment>
                        }
                    />
                }
            />

            {
                createPortal(
                    (<TerminateContract
                        getIsOpen={() => {return open}}
                        tableURL={tableURL}
                        setDisabledSetter={setDisabledSetter}
                        setOpenSetter={setOpenSetter}
                    />),
                    document.body
                )
            }
        </Fragment>
    )
}

export default ContractStartColumn;