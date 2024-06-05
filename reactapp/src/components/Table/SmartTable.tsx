import { AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableScaleWidthMode, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode } from "@ui5/webcomponents-react";
import { CSSProperties, FC, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { toggle } from "@store/slices/toggleSlice";
import { PageInfo, initialPageState } from "@models/Page/Page";
import PageResponse, { defaultPageResponse } from "@/models/Page/PageResponse";
import PaginationBar from "../Bars/PaginationBar";
import PageBar from "../Bars/PageBar";



interface TableProps {
    title: string,
    tableURL: string,
    columns: AnalyticalTableColumnDefinition[],
    header?: ReactNode,
    style?: CSSProperties,
    onRowClick?: (event: any) => void,
    onSuccessCalback?: () => void,
}


const SmartTable: FC<TableProps> = ({ title, tableURL, columns, header, style, onRowClick, onSuccessCalback }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const table = useRef<Record<string, any>>(null);
    const [pageDTO, setPageDTO] = useState<PageInfo>(initialPageState)
    const [data, setData] = useState<PageResponse>(defaultPageResponse);
    const isSuccess = useAppSelector((state) => state.isSuccess.value)
    const dispatchIsSuccess = useAppDispatch()

    
    const initTable = () => {
        const token = sessionStorage.getItem("accessToken")

        return fetch(`${tableURL}/page`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pageDTO),
        })
            .then((response) => response.json())
            .then((res) => {setData(res.data); console.log(res)})
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
            if (onSuccessCalback != undefined) {
                onSuccessCalback()
            }
        }
    }, [isSuccess])

    //да оправя референцията в TableFilterBar
    return (
        <Fragment>
            <AnalyticalTable
                style={style}
                className="table"
                columns={columns}
                data={data.records}
                scaleWidthMode={AnalyticalTableScaleWidthMode.Grow}
                filterable
                header={
                    <div style={{width: "100%"}}>
                        <PageBar title={title}/>
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
            <PaginationBar 
                pages={data.pages}
                setPage={(page: int) => {setPageDTO({...pageDTO, pageNumber: page})}}
            />
        </Fragment>
    )
}

export default SmartTable