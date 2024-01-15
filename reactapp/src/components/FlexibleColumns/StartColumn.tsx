import { CSSProperties, FC, Fragment } from 'react';
import { AnalyticalTableColumnDefinition, Bar, BarDesign, Button, ButtonDesign,FCLLayout} from '@ui5/webcomponents-react';
import SmartTable from '../Table/SmartTable';
import PageBar from '../Bars/PageBar';
import "@ui5/webcomponents-icons/excel-attachment"


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


const StartColumn: FC<StartColumnProps> = ({ tableURL, columns, tableTitle, handleLayoutState, onRowClick}) => {
    const createOnClick = () => { handleLayoutState(FCLLayout.EndColumnFullScreen) }

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
                                <Button design={ButtonDesign.Transparent} onClick={createOnClick}>Създай</Button>
                                <Button icon="excel-attachment"  design={ButtonDesign.Transparent}/>
                            </Fragment>
                        }
                    />
                }
            />
        </Fragment>
    )
}

export default StartColumn;