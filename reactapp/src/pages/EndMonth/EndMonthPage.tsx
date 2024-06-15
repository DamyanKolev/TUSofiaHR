import { employeeEndMonthColumns } from "@/pages/Employees/models/EmployeeColumns";
import { EmployeeView } from "@/pages/Employees/models/EmployeeView";
import { FCLLayout, FlexibleColumnLayout } from "@ui5/webcomponents-react";
import { FC, useState } from "react";
import { EndMonthDataUpdate } from "./models/EndMonthData";
import StartColumn from "./components/FlexibleColumns/StartColumn";
import MidColumn from "./components/FlexibleColumns/MidColumn";
import EndColumn from "./components/FlexibleColumns/EndColumn";
import { getUpdateData } from "@/utils/requests";
import { WorkDataView } from "../Employees/models/WorkDataView";




const EndMonthPage: FC = () => {
    const tableTitle = "Служители";
    const tableURL = "/api/hr/employees";
    const endMonthURL = "/api/hr/end-month"
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<EmployeeView | undefined>(undefined);
    const [workData, setWorkData] = useState<WorkDataView | undefined>(undefined)
    const [endMonthData, setEndMonthData] = useState<EndMonthDataUpdate | undefined>(undefined)


    const onRowClick = async (event: any) => {
        try {
            const row = event.detail.row.original as EmployeeView
            const result = await getUpdateData<EndMonthDataUpdate, number>(row.employeeId, `${endMonthURL}/select`)
            const employeeWorkData = await getUpdateData<WorkDataView, number>(row.employeeId, `${tableURL}/work-data`)
            setSelectedRow(row);
            setWorkData(employeeWorkData)
            
            if (result) {
                setEndMonthData(result)
                setLayout(FCLLayout.MidColumnFullScreen)
            }
            else {
                setLayout(FCLLayout.EndColumnFullScreen)
            }
        }
        catch (error) {
            console.error(error)
        }
    };

    return (
        <FlexibleColumnLayout
            className="flexible-columns ui5-content-density-compact"
            style={{backgroundColor:"var(--sapBackgroundColor)", height:"100%", maxHeight:"calc(100vh - 3.73rem)"}}
            layout={layout}
            startColumn={
                <div style={{height:"100%"}}>
                    <StartColumn
                        tableURL={tableURL}
                        columns={employeeEndMonthColumns}
                        tableTitle={tableTitle}
                        onRowClick={onRowClick}
                    />  
                </div>
            }
            midColumn={
                <div style={{height:"100%"}}>
                    <MidColumn 
                        setLayout={setLayout} 
                        tableURL={endMonthURL}
                        workData={workData}
                        endMonthData={endMonthData}
                        selectedRow={selectedRow}
                    />
                </div>
            }
            endColumn={
                <div style={{height:"100%"}}>
                    <EndColumn 
                        setLayout={setLayout} 
                        tableURL={endMonthURL}
                        workData={workData}
                        selectedRow={selectedRow}
                    />
                </div>
            }
        />
    )
}

export default EndMonthPage