import { FC, ReactNode, useState } from 'react';
import { Button, FCLLayout, FlexibleColumnLayout } from '@ui5/webcomponents-react';
import { TableProps } from '../SmartTable';
import StartColumn from './StartColumn';
import MidColumn from './MidColumn';
import EndColumn from './EndColumn';

interface FlexibleColumnProps {
    updateForm: ReactNode;
    createForm: ReactNode;
    tableProps: TableProps;
}

export function createFlexibleColumnProps(
    updateForm: ReactNode,
    createForm: ReactNode,
    tableProps: TableProps
): FlexibleColumnProps {
    return {
        updateForm,
        createForm,
        tableProps,
    };
}


const FlexibleColumn: FC<{ flexibleColumnProps: FlexibleColumnProps }> = ({ flexibleColumnProps }) => {
    const { updateForm, createForm, tableProps } = flexibleColumnProps
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);

    const createOnClick = () => { setLayout(FCLLayout.EndColumnFullScreen) }

    const updateOnClick = () => { setLayout(FCLLayout.MidColumnFullScreen) }

    return (
        <FlexibleColumnLayout
            className="flexible-columns"
            layout={layout}
            startColumn={
                <div><StartColumn tableProps={tableProps} createOnClick={createOnClick} updateOnClick={updateOnClick} /></div>
            }
            midColumn={
                <div><MidColumn children={updateForm} onClick={() => setLayout(FCLLayout.OneColumn)} /></div>
            }
            endColumn={
                <div><EndColumn children={createForm} onClick={() => setLayout(FCLLayout.OneColumn)} /></div>
            }
        />
    );
};

export default FlexibleColumn;