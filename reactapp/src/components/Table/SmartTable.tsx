import { AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableScaleWidthMode, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode } from "@ui5/webcomponents-react";
import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { toggle } from "@store/slices/toggleSlice";
import { PageInfo, initialPageState } from "@models/Page/Page";
import PageResponse, { defaultPageResponse } from "@models/Page/PageResponse";
//import TableFilterBar from "@components/Bars/FilterBar/TableFilterBar";



interface TableProps {
    tableURL: string,
    columns: AnalyticalTableColumnDefinition[],
    header?: ReactNode,
    style?: CSSProperties,
    onRowClick?: (event: any) => void,
}


const SmartTable: FC<TableProps> = ({ tableURL, columns, header, style, onRowClick }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const table = useRef<Record<string, any>>(null);
    const [pageDTO] = useState<PageInfo>(initialPageState)
    // const [data, setData] = useState<PageResponse>(defaultPageResponse);
    const [data, setData] = useState<any>(defaultPageResponse);
    const isSuccess = useAppSelector((state) => state.isSuccess.value)
    const dispatchIsSuccess = useAppDispatch()

    
    const initTable = () => {
        return fetch(`${tableURL}/page`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pageDTO),
        })
            .then((response) => response.json())
            .then((res) => { setData(res.data); console.log(res)})
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
            dispatchIsSuccess(toggle())
            initTable()
        }
    }, [isSuccess])

    //да оправя референцията в TableFilterBar
    return (
        <AnalyticalTable
            style={style}
            className="table"
            columns={columns}
            data={data}
            scaleWidthMode={AnalyticalTableScaleWidthMode.Grow}
            filterable
            header={
                <div style={{width: "100%"}}>
                    {/*<TableFilterBar fields={data.fields}/>*/}
                    {header}
                </div>
            }
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