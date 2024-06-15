import { CSSProperties, FC, Fragment } from 'react';
import { AnalyticalTableColumnDefinition } from '@ui5/webcomponents-react';
import SmartTable from '@/components/Table/SmartTable';


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
            />
        </Fragment>
    )
}

export default StartColumn;