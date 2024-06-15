//import './Table.css'
import { FC, createContext, useState} from 'react'
import { employeeColumns } from '@/pages/Employees/models/EmployeeColumns'
import { FCLLayout, FlexibleColumnLayout } from '@ui5/webcomponents-react'
import { EmployeeView } from '@/pages/Employees/models/EmployeeView'
import { TableRowState } from '@app-types/TableRowState'
import EmployeeMidColumn from './components/FlexibleColumns/EmployeeMidColumn'
import EmployeeEndColumn from './components/FlexibleColumns/EmployeeEndColumn'
import StartColumn from './components/FlexibleColumns/StartColumn'
import { EndColumnEnum } from './models/EndColumnEnum'
import ContracCreateEndColumn from './components/FlexibleColumns/EndColumns/ContracCreateEndColumn'
import ContractUpdateEndColumn from './components/FlexibleColumns/EndColumns/ContractUpdateEndColumn'


export const EmployeePageContext = createContext<TableRowState<EmployeeView> | undefined>(undefined);


const EmployeePage: FC = () => {
    const tableTitle = "Служители";
    const tableURL = "/api/hr/employees";
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<EmployeeView>({} as EmployeeView);
    const [endColumnOption, setEndColumnOption] = useState<EndColumnEnum>(EndColumnEnum.None)


    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.TwoColumnsMidExpanded)
        setSelectedRow(row);
    };

    const createOnClick = () => {
        setLayout(FCLLayout.EndColumnFullScreen)
        setEndColumnOption(EndColumnEnum.InsertEmployee)
    }

    return (
        <EmployeePageContext.Provider value={{selectedRow, setSelectedRow}}>
                <FlexibleColumnLayout
                    className="flexible-columns ui5-content-density-compact"
                    style={{backgroundColor:"var(--sapBackgroundColor)"}}
                    layout={layout}
                    startColumn={
                        <div>
                            <StartColumn
                                tableURL={tableURL}
                                columns={employeeColumns}
                                tableTitle={tableTitle}
                                createOnClick={createOnClick}
                                onRowClick={onRowClick}
                            />  
                        </div>
                    }
                    midColumn={
                        <div>
                            <EmployeeMidColumn 
                                setLayout={setLayout} 
                                layout={layout} 
                                tableURL={tableURL} 
                                setEndColumnOption={setEndColumnOption}
                            />
                        </div>
                    }
                    endColumn={
                        <div style={{height:"100%"}}>
                        {
                            endColumnOption == EndColumnEnum.InsertEmployee &&
                            <EmployeeEndColumn 
                                setLayout={setLayout} 
                                tableURL={tableURL}
                                setEndColumnOption={setEndColumnOption}
                            />
                        }
                        {
                            endColumnOption == EndColumnEnum.InsertContract &&
                            <ContracCreateEndColumn 
                                setLayout={setLayout} 
                                layout={layout} 
                                selectedRow={selectedRow} 
                                setEndColumnOption={setEndColumnOption}
                            />
                        }
                        {
                            endColumnOption == EndColumnEnum.UpdateContract &&
                            <ContractUpdateEndColumn 
                                setLayout={setLayout} 
                                layout={layout}
                                setEndColumnOption={setEndColumnOption}
                            />
                        }
                    </div>
                    }
            />
        </EmployeePageContext.Provider>
    )
}

export default EmployeePage
