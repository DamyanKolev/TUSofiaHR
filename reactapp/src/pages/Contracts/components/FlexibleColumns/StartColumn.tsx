import { CSSProperties, FC, Fragment } from 'react';
import { AnalyticalTableColumnDefinition, Bar, BarDesign, Button, ButtonDesign,FCLLayout} from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/excel-attachment"
import SmartTable from '@/components/Table/SmartTable';


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
            <SmartTable
                title={tableTitle}
                style={tableStyle}
                tableURL={tableURL}
                columns={columns}
                onRowClick={onRowClick}
                header={
                    <Bar 
                        design={BarDesign.Subheader}
                        endContent={
                            <Fragment>
                                <Button design={ButtonDesign.Transparent} onClick={createOnClick}>Добави</Button>
                            </Fragment>
                        }
                    />
                }
            />
        </Fragment>
    )
}

export default StartColumn;