import { FC, ReactNode, useState } from 'react';
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
    tableTitle: string,
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
    createForm: ReactNode,
    updateForm: ReactNode
}



const FlexibleColumn: FC<FlexibleColumnProps> = ({ tableTitle, dataURL, columns, updateForm, createForm }) => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<any>(null);


    const handleLayoutState = (layout: FCLLayout) => {
        setLayout(layout)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.MidColumnFullScreen)
        setSelectedRow(row);
    };

    return (
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
                            onRowClick={onRowClick}
                        />
                    </div>
                }
                midColumn={
                    <div><MidColumn handleLayoutState={handleLayoutState} updateForm={updateForm} /></div>
                }
                endColumn={
                    <div><EndColumn handleLayoutState={handleLayoutState} createForm={createForm} /></div>
                }
            />
        </FlexibleContext.Provider>
    );
};

export default FlexibleColumn;