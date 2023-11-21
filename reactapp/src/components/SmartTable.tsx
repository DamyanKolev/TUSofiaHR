import {
    AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode, Bar, Button,
    ButtonDesign
} from "@ui5/webcomponents-react";
import React from "react";
import { FC, useEffect, useState } from "react";


interface PageRequest {
    PageNumber: int,
    PageSize: int,
}

export interface TableProps {
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
}

export function createTableProps(dataURL: string, columns: AnalyticalTableColumnDefinition[]): TableProps {
    return {
        dataURL,
        columns,
    }
}

export const SmartTable: FC<{ tableProps: TableProps, createOnClick: () => void, updateOnClick: () => void }> = ({ tableProps, createOnClick,
    updateOnClick }) => {
    const { dataURL, columns} = tableProps
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ pageReq ] = useState<PageRequest>({
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


    return (
        <AnalyticalTable
            className="table"
            columns={columns}
            data={data}
            filterable
            header={<><TableHeader createOnClick={createOnClick} updateOnClick={updateOnClick} /></>}
            selectionMode={AnalyticalTableSelectionMode.SingleSelect}
            selectionBehavior={AnalyticalTableSelectionBehavior.RowOnly}
            loading={isLoading }
            infiniteScroll
            withRowHighlight
        >
        </AnalyticalTable>
    )
}


interface TableHeaderProps {
    createOnClick: () => void,
    updateOnClick: () => void,
}

const TableHeader: FC<TableHeaderProps> = ({createOnClick, updateOnClick }) => {

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