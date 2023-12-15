import { AnalyticalTableColumnDefinition } from '@ui5/webcomponents-react'
//import './Table.css'
import { FC} from 'react'
import FlexibleColumn from '@components/FlexibleColumn/FlexibleColumn'
import CreateEmployeeForm from '@components/Forms/Create/CreateEmployeeForm'
import UpdateEmployeeForm from '@components/Forms/Update/UpdateEmployeeForm'



const columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "firstName",
        Header: "Име",
    },
    {
        accessor: "surname",
        Header: "Презиме",
    },
    {
        accessor: "lastName",
        Header: "Фамилия",
    },

]



const EmployeePage: FC = () => {
    const tableTitle = "Employees";
    const dataURL = "/api/employees";

    return (
        <FlexibleColumn
            tableTitle={tableTitle}
            dataURL={dataURL}
            columns={columns}
            createForm={<><CreateEmployeeForm/></>}
            updateForm={<><UpdateEmployeeForm/></>}
        />

    )
}

export default EmployeePage
