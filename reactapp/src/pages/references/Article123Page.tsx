import PageBar from "@components/Bars/PageBar";
import { Button, ButtonDesign } from "@ui5/webcomponents-react";
// import { downloadFile } from "@utils/download";
import { FC } from "react";



const Article123Page: FC = () => {
    const tableTitle = "Уведомление по Чл. 123"

    const onClick = async () =>{
        // const fetchURL = "/api/hr/references/article123-references"
        // const filename = "article62"
        // downloadFile(fetchURL, filename)
    }

    return (
        <>
            <PageBar title={tableTitle}>
                <Button design={ButtonDesign.Transparent} onClick={onClick} slot="endContent">Справка</Button>
            </PageBar>
        </>
    )
}

export default Article123Page