import { AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode } from "@ui5/webcomponents-react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";



interface PageDTO {
    PageNumber: int,
    PageSize: int,
}

interface TableProps {
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
    header?: ReactNode,
    onRowClick?: (event: any) => void,
    isSuccessGetter: () => boolean,
    isSuccessSetter: (value: boolean) => void,
}


const SmartTable: FC<TableProps> = ({ dataURL, columns, header, onRowClick, isSuccessGetter, isSuccessSetter }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const table = useRef<Record<string, any>>(null);
    const [pageDTO] = useState<PageDTO>({
        PageNumber: 1,
        PageSize: 50,
    })
    const [data, setData] = useState([]);
    const isSuccess = isSuccessGetter()


    const initTable = () => {
        return fetch(`${dataURL}/page`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pageDTO),
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

    //chage the data after success update or insert into database
    useEffect(() => {
        if (isSuccess) {
            initTable().then(() => {
                isSuccessSetter(false)
            });
        }
    }, [isSuccess])

    return (
        <AnalyticalTable
            className="table"
            columns={columns}
            data={data}
            filterable
            header={header}
            selectionMode={AnalyticalTableSelectionMode.SingleSelect}
            selectionBehavior={AnalyticalTableSelectionBehavior.RowOnly}
            loading={isLoading}
            infiniteScroll
            onRowClick={onRowClick}
            tableInstance={table}
        />
    )
}

export default SmartTable