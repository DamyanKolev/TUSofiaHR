import React, { FC, useEffect, useState } from 'react';
import {
    AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode, Bar, Button,
    ButtonDesign,
    Title,
    TitleLevel
} from '@ui5/webcomponents-react';

interface StartColumnProps {
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
    createOnClick: () => void;
    updateOnClick: () => void;
}

interface PageRequest {
    PageNumber: int,
    PageSize: int,
}


const StartColumn: FC<StartColumnProps> = ({ dataURL, columns, tableTitle, createOnClick, updateOnClick }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedRow, setSelectedRow] = useState(null);
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
            .then((res) => setData(res))
            .catch(console.error);
    }

    useEffect(() => {
        initTable().then(() => {
            setIsLoading(false);
        });
    }, []);


    const onRowSelect = (event: any) => {
        setSelectedRow(event.detail.row);
        console.log(selectedRow)
    };


    return (
        <React.Fragment>
            <StartColumnBar tableTitle={tableTitle} />
            <AnalyticalTable
                className="table"
                columns={columns}
                data={data}
                filterable
                header={<><TableHeader createOnClick={createOnClick} updateOnClick={updateOnClick} /></>}
                selectionMode={AnalyticalTableSelectionMode.SingleSelect}
                selectionBehavior={AnalyticalTableSelectionBehavior.RowOnly}
                loading={isLoading}
                infiniteScroll
                withRowHighlight
                onRowClick={onRowSelect}
            >
            </AnalyticalTable>
        </React.Fragment>
    )
}



interface TableHeaderProps {
    createOnClick: () => void,
    updateOnClick: () => void,
}

const TableHeader: FC<TableHeaderProps> = ({ createOnClick, updateOnClick }) => {

    return (
        <React.Fragment>
            <Bar
                endContent={
                    <React.Fragment>
                        <Button design={ButtonDesign.Transparent} onClick={createOnClick}>Create</Button>
                        <Button design={ButtonDesign.Transparent} onClick={updateOnClick}>Update</Button>
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