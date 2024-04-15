import { CSSProperties, FC, Fragment } from 'react';
import { AnalyticalTableColumnDefinition, Bar, BarDesign, Button, ButtonDesign } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/excel-attachment"
import SmartTable from '@components/Table/SmartTable';


const tableStyle: CSSProperties = {
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}


interface StartColumnProps {
    tableURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
    onRowClick: (event: any) => void,
}


const StartColumn: FC<StartColumnProps> = ({ tableURL, columns, tableTitle, onRowClick}) => {
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