import { FC, ReactNode, useState } from 'react';
import {
    AnalyticalTableColumnDefinition, FCLLayout, FlexibleColumnLayout,
} from '@ui5/webcomponents-react';
import StartColumn from './StartColumn';
import MidColumn from './MidColumn';
import EndColumn from './EndColumn';
import React from 'react';

interface FlexibleColumnProps {
    updateForm: ReactNode;
    createForm: ReactNode;
    tableTitle: string;
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
}

export function createFlexibleColumnProps(
    updateForm: ReactNode,
    createForm: ReactNode,
    tableTitle: string,
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
): FlexibleColumnProps {
    return {
        updateForm,
        createForm,
        tableTitle,
        dataURL,
        columns
    };
}


const FlexibleColumn: FC<{ flexibleColumnProps: FlexibleColumnProps }> = ({ flexibleColumnProps }) => {
    const { updateForm, createForm, tableTitle, dataURL, columns } = flexibleColumnProps
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);

    const createOnClick = () => { setLayout(FCLLayout.EndColumnFullScreen) }

    const updateOnClick = () => { setLayout(FCLLayout.MidColumnFullScreen) }

    return (
        <React.Fragment>
            <FlexibleColumnLayout
                className="flexible-columns"
                layout={layout}
                startColumn={
                    <div>
                        <StartColumn
                            dataURL={dataURL}
                            columns={columns}
                            tableTitle={tableTitle}
                            createOnClick={createOnClick}
                            updateOnClick={updateOnClick}
                        />
                    </div>
                }
                midColumn={
                    <div><MidColumn children={updateForm} onClick={() => setLayout(FCLLayout.OneColumn)} /></div>
                }
                endColumn={
                    <div><EndColumn children={createForm} onClick={() => setLayout(FCLLayout.OneColumn)} /></div>
                }
            />
        </React.Fragment>
    );
};

export default FlexibleColumn;