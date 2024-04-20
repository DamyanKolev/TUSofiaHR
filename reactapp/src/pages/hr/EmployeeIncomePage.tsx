import { TableRowState } from "@app-types/TableRowState";
import EndColumn from "@components/FlexibleColumns/income/EndColumn";
import MidColumn from "@components/FlexibleColumns/income/MidColumn";
import StartColumn from "@components/FlexibleColumns/income/StartColumn";
import { ScheduleIncomeUpdate } from "@models/HR/ScheduleIncome";
import { employeeColumns } from "@models/TableColumns/EmployeeColumns";
import { EmployeeView } from "@models/TableViews/EmployeeView";
import { FCLLayout, FlexibleColumnLayout } from "@ui5/webcomponents-react";
import { getUpdateData } from "@utils/getData";
import { createContext, FC, useState } from "react";


export const IncomePageContext = createContext<TableRowState<EmployeeView> | undefined>(undefined);
export const IncomePageDataContext = createContext<ScheduleIncomeUpdate | undefined>(undefined);




const EmployeeIncomePage: FC = () => {
    const tableTitle = "Служители";
    const tableURL = "/api/hr/employees";
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<EmployeeView>({} as EmployeeView);
    const [scheduleIncome, setScheduleIncome] = useState<ScheduleIncomeUpdate>({} as ScheduleIncomeUpdate)


    const handleLayoutState = (layout: FCLLayout) => {
        setLayout(layout)
    }

    const onRowClick = async (event: any) => {
        const row = event.detail.row.original
        const result = await getUpdateData<ScheduleIncomeUpdate, number>(row.employee_id, `${tableURL}/income-select`)
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
                    style={{backgroundColor:"white"}}
                    layout={layout}
                    startColumn={
                        <div>
                            <StartColumn
                                tableURL={tableURL}
                                columns={employeeColumns}
                                tableTitle={tableTitle}
                                onRowClick={onRowClick}
                            />  
                        </div>
                    }
                    midColumn={
                        <div><MidColumn handleLayoutState={handleLayoutState} tableURL={tableURL}/></div>
                    }
                    endColumn={
                        <div><EndColumn handleLayoutState={handleLayoutState} tableURL={tableURL}/></div>
                    }
                        
                />
            </IncomePageContext.Provider>
        </IncomePageDataContext.Provider>
    )
}

export default EmployeeIncomePage