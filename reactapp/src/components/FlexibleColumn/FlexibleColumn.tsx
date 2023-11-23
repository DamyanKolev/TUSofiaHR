import { FC, useState } from 'react';
import {
    AnalyticalTableColumnDefinition, FCLLayout, FlexibleColumnLayout,
} from '@ui5/webcomponents-react';
import StartColumn from './StartColumn';
import MidColumn from './MidColumn';
import EndColumn from './EndColumn';
import React from 'react';

export const FlexibleContext = React.createContext<any>(null);
export const TableContext = React.createContext<string>("");

interface FlexibleColumnProps {
    tableName: string,
    tableTitle: string,
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
}



const FlexibleColumn: FC<FlexibleColumnProps> = ({ tableName, tableTitle, dataURL, columns }) => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<any>(null);


    const handleLayoutState = (layout: FCLLayout) => {
        setLayout(layout)
    }

    const onRowSelect = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.MidColumnFullScreen)
        setSelectedRow(row);
    };

    return (
        <TableContext.Provider value={tableName}>
            <FlexibleContext.Provider value={selectedRow}>
                <FlexibleColumnLayout
                    className="flexible-columns ui5-content-density-compact"
                    layout={layout}
                    startColumn={
                        <div>
                            <StartColumn
                                dataURL={dataURL}
                                columns={columns}
                                tableTitle={tableTitle}
                                handleLayoutState={handleLayoutState}
                                onRowSelect={onRowSelect}
                            />
                        </div>
                    }
                    midColumn={
                        <div><MidColumn handleLayoutState={handleLayoutState} /></div>
                    }
                    endColumn={
                        <div><EndColumn handleLayoutState={handleLayoutState} /></div>
                    }
                />
            </FlexibleContext.Provider>
        </TableContext.Provider>
    );
};

export default FlexibleColumn;