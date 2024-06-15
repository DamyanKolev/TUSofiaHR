import PageBar from "@/components/Bars/PageBar";
import PaginationBar from "@/components/Bars/PaginationBar";
import { initialPageState, PageInfo } from "@/models/Page/Page";
import PageResponse, { defaultPageResponse } from "@/models/Page/PageResponse";
import { toggle } from "@/store/slices/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableScaleWidthMode, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode } from "@ui5/webcomponents-react";
import { CSSProperties, FC, Fragment, ReactNode, useEffect, useRef, useState } from "react";


const tableStyle: CSSProperties = {
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}


interface TableProps {
    title: string,
    tableURL: string,
    columns: AnalyticalTableColumnDefinition[],
    header?: ReactNode,
    onRowClick?: (event: any) => void,
    onSuccessCalback: (data: Array<any>) => void,
}


const SmartTable: FC<TableProps> = ({ title, tableURL, columns, header, onRowClick, onSuccessCalback }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const table = useRef<Record<string, any>>(null);
    const [pageDTO, setPageDTO] = useState<PageInfo>(initialPageState)
    const [data, setData] = useState<PageResponse>(defaultPageResponse);
    const isSuccess = useAppSelector((state) => state.isSuccess.value)
    const dispatchIsSuccess = useAppDispatch()


    const postRequest = async() => {
        const token = sessionStorage.getItem("accessToken")
        const response = await fetch(`${tableURL}/page`,{
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pageDTO),
        })

        const result = await response.json()

        if(response.ok) {
            setData(result.data)
            onSuccessCalback(result.data.records)
            setIsLoading(false);
        }
        else {
            throw Error(result.errors)
        }
    }


    
    const initTable = () => {
        try {
            postRequest()
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        initTable()
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
        <Fragment>
            <AnalyticalTable
                style={tableStyle}
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