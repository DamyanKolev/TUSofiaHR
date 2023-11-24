import { AnalyticalTableColumnDefinition } from '@ui5/webcomponents-react'
import './Table.css'
import { FC, useState } from 'react'
import FlexibleColumn from '@components/FlexibleColumn/FlexibleColumn'



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
    const [tableTitle] = useState("Employees");
    const [tableName] = useState("employee");
    const [dataURL] = useState("/api/employees");


    return (
        <FlexibleColumn tableName={ tableName} tableTitle={tableTitle} dataURL={dataURL} columns={columns} />
    )
}

export default Employee
