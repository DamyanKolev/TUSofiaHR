//import './Table.css'
import { FC, createContext, useState} from 'react'
import { employeeColumns } from '@models/TableColumns/EmployeeColumns'
import { FCLLayout, FlexibleColumnLayout } from '@ui5/webcomponents-react'
import StartColumn from '@components/FlexibleColumns/StartColumn'
import EmployeeEndColumn from '@components/FlexibleColumns/employee/EmployeeEndColumn'
import EmployeeMidColumn from '@components/FlexibleColumns/employee/EmployeeMidColumn'
import { TableRowState } from '@/types/TableRowState'
import { EmployeeView } from '@/models/TableViews/EmployeeView'


export const EmployeePageContext = createContext<TableRowState<EmployeeView> | undefined>(undefined);


const EmployeePage: FC = () => {
    const tableTitle = "Employees";
    const tableURL = "/api/employees";
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<EmployeeView>({} as EmployeeView);


    const handleLayoutState = (layout: FCLLayout) => {
        setLayout(layout)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.MidColumnFullScreen)
        setSelectedRow(row);
    };

    return (
        <EmployeePageContext.Provider value={{selectedRow, setSelectedRow}}>
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
                                handleLayoutState={handleLayoutState}
                                onRowClick={onRowClick}
                            />  
                        </div>
                    }
                    midColumn={
                        <div><EmployeeMidColumn handleLayoutState={handleLayoutState} tableURL={tableURL}/></div>
                    }
                    endColumn={
                        <div><EmployeeEndColumn handleLayoutState={handleLayoutState} tableURL={tableURL}/></div>
                    }
            />
        </EmployeePageContext.Provider>
    )
}

export default EmployeePage
