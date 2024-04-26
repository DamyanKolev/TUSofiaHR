import PageBar from "@/components/Bars/PageBar"
import article62Columns from "@/models/TableColumns/Article62Columns"
import SmartTable from "@components/Table/SmartTable"
import { Bar, BarDesign, Button, ButtonDesign } from "@ui5/webcomponents-react"
import { FC } from "react"



const Article62: FC = () => {
    const tableTitle = "Уведомление по Чл. 62"
    const tableURL = "/api/hr/references/article62"

    const onClick = async () =>{
        const fetchURL = "/api/hr/references/article62/declaration"
        const filename = "article62"
        // downloadFile(fetchURL, filename)
    }

    return (
        <div className="flexible-columns ui5-content-density-compact">
            <SmartTable
                filterBar={false}
                columns={article62Columns}
                tableURL={tableURL}
                title={tableTitle}
                header={
                    <Bar
                        design={BarDesign.Subheader}
                        endContent={
                            <>
                                <Button design={ButtonDesign.Transparent} onClick={onClick} slot="endContent">PDF Справка</Button>
                                <Button design={ButtonDesign.Transparent} onClick={onClick} slot="endContent">НАП Справка</Button>
                            </>
                        }
                    />
                }
            />
        </div>
    )
}

export default Article62