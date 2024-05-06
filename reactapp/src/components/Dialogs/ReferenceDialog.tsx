import { downloadFile } from "@/utils/download";
import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Text, Title, TitleLevel } from "@ui5/webcomponents-react";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    referenceData: string
}

const ReferenceDialog: FC<Props> = ({open, setOpen, referenceData}) => {

    const onAfterClose = () => {
        setOpen(false)
    }

    const onPDFClick = () => {
        const fetchURL = `/api/hr/references/${referenceData}/pdf`
        const filename = referenceData
        const fileType = "application/pdf"
        downloadFile(fetchURL, filename, fileType)
        setOpen(false)
    }

    const onCSVClick = () => {
        const fetchURL = `/api/hr/references/${referenceData}/csv`
        const filename = referenceData
        const fileType = "text/csv;charset=utf-8"
        downloadFile(fetchURL, filename, fileType)
        setOpen(false)
    }

    return (
        <Dialog 
            onAfterClose={onAfterClose}
            open={open}
            header={
                <Bar
                    startContent={
                        <Title level={TitleLevel.H4}>Справка </Title>
                    }
                />
            }
            footer={
                <Bar
                    endContent={
                        <>
                            <Button  design={ButtonDesign.Transparent} onClick={onAfterClose}>Отказ</Button>
                        </>
                    }
                />
            }
        >
            <FlexBox 
                style={{paddingInline: "1.5rem", paddingBlockStart: "1rem", paddingBlockEnd:"2rem", gap:"0.5rem"}}
                direction={FlexBoxDirection.Column} 
                alignItems={FlexBoxAlignItems.Center}
                justifyContent={FlexBoxJustifyContent.Center}
            >
                
                <FlexBox direction={FlexBoxDirection.Column} style={{gap:".3rem"}} alignItems={FlexBoxAlignItems.Center}>
                    <Text style={{fontSize:"1.1rem"}}>Избере начина по който искате да получите справката</Text>
                    <Text style={{fontSize:"1.1rem"}}>PDF Декларация или НАП CSV формат</Text>
                </FlexBox>

                <FlexBox style={{gap:"4rem", marginBlockStart: "1rem"}}>
                    <Button design={ButtonDesign.Emphasized} style={{width:"8rem"}} onClick={onPDFClick}>PDF</Button>
                    <Button design={ButtonDesign.Emphasized} style={{width:"8rem"}} onClick={onCSVClick}>CSV</Button>
                </FlexBox>
            </FlexBox>
        </Dialog>
    )
}

export default ReferenceDialog