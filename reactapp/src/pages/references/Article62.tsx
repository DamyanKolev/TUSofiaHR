import SmartTable from "@components/Table/SmartTable"
import article62Columns from "@models/TableColumns/Article62Columns"
import { FC } from "react"



const Article62: FC = () => {
    const tableTitle = "Уведомление по Чл. 62"
    const tableURL = "/api/hr/references/article62"

    return (
        <div className="flexible-columns ui5-content-density-compact">
            <SmartTable
                filterBar={false}
                columns={article62Columns}
                tableURL={tableURL}
                title={tableTitle}
            />
        </div>
    )
}

export default Article62