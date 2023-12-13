import { FC, Fragment, MutableRefObject} from 'react';
import { AnalyticalTableColumnDefinition, Bar, Button, ButtonDesign,FCLLayout } from '@ui5/webcomponents-react';
import SmartTable from '../Table/SmartTable';
import PageBar from '../Bars/PageBar';


interface StartColumnProps {
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
    handleLayoutState: (layout: FCLLayout) => void,
    onRowClick: (event: any) => void,
    isSuccessGetter: () => boolean,
    isSuccessSetter: (value: boolean) => void,
}


const StartColumn: FC<StartColumnProps> = ({ dataURL, columns, tableTitle, handleLayoutState, onRowClick, isSuccessGetter, isSuccessSetter }) => {
    const createOnClick = () => { handleLayoutState(FCLLayout.EndColumnFullScreen) }

    return (
        <Fragment>
            <PageBar title={tableTitle} />
            <SmartTable
                dataURL={dataURL}
                columns={columns}
                onRowClick={onRowClick}
                isSuccessGetter={isSuccessGetter}
                isSuccessSetter={isSuccessSetter }
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