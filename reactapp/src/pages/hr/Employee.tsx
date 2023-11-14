import { AnalyticalTableColumnDefinition } from '@ui5/webcomponents-react'
import { createTableProps } from '../../components/SmartTable'

import './Table.css'
import { FC, useState } from 'react'
import UpdateEmployeeForm from '../../components/forms/update-forms/UpdateContractForm'
import CreateEmployeeForm from '../../components/forms/create-forms/CreateEmployeeForm'
import FlexibleColumn, { createFlexibleColumnProps } from '../../components/FlexibleColumn/FlexibleColumn'



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



const Employee: FC = () => {
    const [tableTitle] = useState("Contracts");
    const [dataURL] = useState("/api/employees");

    const tableProps = createTableProps(dataURL, columns, tableTitle)
    const flexibleColumnProps = createFlexibleColumnProps(UpdateEmployeeForm({}), CreateEmployeeForm({}), tableProps)


    return (
        <FlexibleColumn
            flexibleColumnProps={flexibleColumnProps }
        />
    )
}

export default Employee
