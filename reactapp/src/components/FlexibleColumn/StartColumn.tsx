import { FC, Fragment } from 'react';
import { AnalyticalTableColumnDefinition, Bar, Button, ButtonDesign,FCLLayout } from '@ui5/webcomponents-react';
import SmartTable from '../Table/SmartTable';
import PageBar from '../Bars/PageBar';


interface StartColumnProps {
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
    handleLayoutState: (layout: FCLLayout) => void,
    onRowClick: (event: any) => void,
}


const StartColumn: FC<StartColumnProps> = ({ dataURL, columns, tableTitle, handleLayoutState, onRowClick}) => {
    const createOnClick = () => { handleLayoutState(FCLLayout.EndColumnFullScreen) }

    return (
        <Fragment>
            <PageBar title={tableTitle} />
            <SmartTable
                dataURL={dataURL}
                columns={columns}
                onRowClick={onRowClick}
                header={
                    <Fragment>
                        <Bar
                            endContent={
                                <Fragment>
                                    <Button design={ButtonDesign.Transparent} onClick={createOnClick}>Create</Button>
                                </Fragment>
                            }
                        >
                        </Bar>
                    </Fragment>
                }
            />
        </Fragment>
    )
}

export default StartColumn;