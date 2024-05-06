import { TableRowState } from "@app-types/TableRowState";
import EndColumn from "@/components/FlexibleColumns/endMonth/EndColumn";
import MidColumn from "@/components/FlexibleColumns/endMonth/MidColumn";
import StartColumn from "@/components/FlexibleColumns/endMonth/StartColumn";
import { employeeColumns } from "@models/TableColumns/EmployeeColumns";
import { EmployeeView } from "@models/TableViews/EmployeeView";
import { FCLLayout, FlexibleColumnLayout } from "@ui5/webcomponents-react";
import { getUpdateData } from "@utils/getData";
import { createContext, FC, useState } from "react";
import { EndMonthDataUpdate } from "@/models/HR/EndMonthData";


export const IncomePageContext = createContext<TableRowState<EmployeeView> | undefined>(undefined);
export const IncomePageDataContext = createContext<EndMonthDataUpdate | undefined>(undefined);




const EndMonthPage: FC = () => {
    const tableTitle = "Доходи и Графици";
    const tableURL = "/api/hr/employees";
    const endMonthURL = "/api/hr/end-month"
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<EmployeeView>({} as EmployeeView);
    const [scheduleIncome, setScheduleIncome] = useState<EndMonthDataUpdate>({} as EndMonthDataUpdate)


    const handleLayoutState = (layout: FCLLayout) => {
        setLayout(layout)
    }

    const onRowClick = async (event: any) => {
        const row = event.detail.row.original as EmployeeView
        const result = await getUpdateData<EndMonthDataUpdate, number>(row.employeeId, `${endMonthURL}/select`)
        setSelectedRow(row);
        
        if (result) {
            setScheduleIncome(result)
            setLayout(FCLLayout.MidColumnFullScreen)
        }
        else {
            setLayout(FCLLayout.EndColumnFullScreen)
        }

    };

    return (
        <IncomePageDataContext.Provider value={scheduleIncome}>
            <IncomePageContext.Provider value={{selectedRow, setSelectedRow}}>
                <FlexibleColumnLayout
                    className="flexible-columns ui5-content-density-compact"
                    style={{backgroundColor:"var(--sapBackgroundColor)", height:"100%"}}
                    layout={layout}
                    startColumn={
                        <div style={{height:"100%"}}>
                            <StartColumn
                                tableURL={tableURL}
                                columns={employeeColumns}
                                tableTitle={tableTitle}
                                onRowClick={onRowClick}
                            />  
                        </div>
                    }
                    midColumn={
                        <div style={{height:"100%"}}><MidColumn handleLayoutState={handleLayoutState} tableURL={tableURL}/></div>
                    }
                    endColumn={
                        <div  style={{height:"100%"}}><EndColumn handleLayoutState={handleLayoutState} tableURL={tableURL}/></div>
                    }
                        
                />
            </IncomePageContext.Provider>
        </IncomePageDataContext.Provider>
    )
}

export default EndMonthPage