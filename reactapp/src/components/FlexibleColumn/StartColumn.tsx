import React, { FC, useEffect, useRef, useState } from 'react';
import {
    AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode, Bar, Button,
    ButtonDesign,FCLLayout, Title, TitleLevel
} from '@ui5/webcomponents-react';

interface StartColumnProps {
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
    handleLayoutState: (layout: FCLLayout) => void,
    onRowSelect: (event: any) => void,
}

interface PageRequest {
    PageNumber: int,
    PageSize: int,
}


const StartColumn: FC<StartColumnProps> = ({ dataURL, columns, tableTitle, handleLayoutState, onRowSelect }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const table = useRef<Record<string, any>>(null);
    const [pageReq] = useState<PageRequest>({
        PageNumber: 1,
        PageSize: 50,
    })
    const [data, setData] = useState([]);

    const initTable = () => {
        return fetch(`${dataURL}/page`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pageReq),
        })
            .then((response) => response.json())
            .then((res) => setData(res.data))
            .catch(console.error);
    }

    useEffect(() => {
        initTable().then(() => {
            setIsLoading(false);
        });
    }, []);


    

    return (
        <React.Fragment>
            <StartColumnBar tableTitle={tableTitle} />
            <AnalyticalTable
                className="table"
                columns={columns}
                data={data}
                filterable
                header={<><TableHeader handleLayoutState={handleLayoutState}/></>}
                selectionMode={AnalyticalTableSelectionMode.SingleSelect}
                selectionBehavior={AnalyticalTableSelectionBehavior.RowOnly}
                loading={isLoading}
                infiniteScroll
                onRowClick={onRowSelect}
                tableInstance={table }
            >
            </AnalyticalTable>
        </React.Fragment>
    )
}



interface TableHeaderProps {
    handleLayoutState: (layout: FCLLayout) => void,
}

const TableHeader: FC<TableHeaderProps> = ({ handleLayoutState }) => {
    const createOnClick = () => { handleLayoutState(FCLLayout.EndColumnFullScreen) }

    return (
        <React.Fragment>
            <Bar
                endContent={
                    <React.Fragment>
                        <Button design={ButtonDesign.Transparent} onClick={createOnClick}>Create</Button>
                    </React.Fragment>
                }
            >
            </Bar>
        </React.Fragment>
    )
}


interface StartColumnBarProps {
    tableTitle: string;
}

const StartColumnBar: FC<StartColumnBarProps> = ({ tableTitle }) => {
    return (
        <div className="table-header-bar">
            <Bar
                startContent={
                    <React.Fragment>
                        <Button
                            design={ButtonDesign.Transparent}
                            icon="nav-back"
                            onClick={() => window.location.href = "/"}
                        />
                        <Title level={TitleLevel.H2}>{tableTitle}</Title>
                    </React.Fragment>
                }
            >
            </Bar>
        </div>
    )
}

export default StartColumn;