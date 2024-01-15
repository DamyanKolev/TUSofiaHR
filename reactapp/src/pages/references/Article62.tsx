import PageBar from "@components/Bars/PageBar"
import SmartTable from "@components/Table/SmartTable"
import article62Columns from "@models/TableColumns/Article62Columns"
import { FC, Fragment } from "react"



const Article62: FC = () => {
    const tableTitle = "Справка по Чл. 62"
    const tableURL = "/backend/api/hr/references/article62"

    return (
        <Fragment>
            <PageBar title={tableTitle} />
            <SmartTable
                columns={article62Columns}
                tableURL={tableURL}
            />
        </Fragment>
    )
}

export default Article62