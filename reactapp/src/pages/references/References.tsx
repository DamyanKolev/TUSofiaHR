import { FC, useState } from 'react';
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Link, MessageBox, MessageBoxActions, ProductSwitch, ProductSwitchItem, ProductSwitchItemDomRef, Text, Ui5CustomEvent } from "@ui5/webcomponents-react";
import PageBar from '@components/Bars/PageBar';
import { createPortal } from 'react-dom';
import ReferenceDialog from '@/components/Dialogs/ReferenceDialog';
import { getRequest } from '@/utils/requests';


const References: FC = () => {
    const [referenceData, setReferenceData] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [article62Message, setArticle62Message] = useState<boolean>(false)
    const [declarationMessage, setDeclarationMessage] = useState<boolean>(false)

    const onCloseArticle62 = () => {
        setArticle62Message(false)
    }

    const onCloseDeclaration = () => {
        setDeclarationMessage(false)
    }

    const onClickReference = async (event: Ui5CustomEvent<ProductSwitchItemDomRef, never>) => {
        try {
            const isMonthFinished = await getRequest<boolean>("/api/hr/end-month/is-month-finished")
            if (isMonthFinished) {
                const currRefData = event.target.dataset.table
                if (currRefData) {
                    setReferenceData(currRefData)
                    setOpen(true)
                }
            }
            else {
                setDeclarationMessage(true)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const onClickArticle62 = async (event: Ui5CustomEvent<ProductSwitchItemDomRef, never>) => {
        try {
            const isHaveAticles62 = await getRequest<boolean>("/api/hr/references/article62/is-have")
            if (isHaveAticles62) {
                const currRefData = event.target.dataset.table
                if (currRefData) {
                    setReferenceData(currRefData)
                    setOpen(true)
                }
            }
            else {
                setArticle62Message(true)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <FlexBox direction={FlexBoxDirection.Column}>
            <PageBar title='Справки'/>
            <ProductSwitch>
                <ProductSwitchItem
                    onClick={onClickArticle62}
                    data-table="article62"
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    titleText="Уведомление"
                    subtitleText="Член 62 от закона за ТД"
                />

                <ProductSwitchItem
                    onClick={onClickReference}
                    data-table="declaration1"
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    titleText="Декларация 1"
                    subtitleText="Декларация 1"
                />

                <ProductSwitchItem
                    onClick={onClickReference}
                    data-table="declaration6"
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    titleText="Декларация 6"
                    subtitleText="Декларация 6"
                />
            </ProductSwitch>


            {
                open &&
                createPortal(
                    <ReferenceDialog
                        open={open}
                        setOpen={setOpen}
                        referenceData={referenceData}
                    />,
                    document.body
                )
            }


            {
                createPortal (
                    <MessageBox
                        titleText="Информация"
                        open={article62Message}
                        onClose={onCloseArticle62}
                        actions={[MessageBoxActions.OK]}
                    >
                        <Text style={{fontSize:"1.1rem", padding:"1rem"}}>Няма неизпратени уведомления</Text>
                    </MessageBox>,
                    document.body
                )
            }

            {
                createPortal (
                    <MessageBox
                        titleText="Месеца не е приключен"
                        open={declarationMessage}
                        onClose={onCloseDeclaration}
                        actions={[MessageBoxActions.OK]}
                    >
                        <FlexBox 
                            style={{fontSize:"1rem", padding:"1rem", gap:".5rem"}} 
                            alignItems={FlexBoxAlignItems.Center} 
                            direction={FlexBoxDirection.Row}
                        >
                            <Text style={{fontSize:"1rem"}}>
                                Натиснете линка, за да приключите месеца.
                            </Text>
                            <Link style={{fontSize:"1rem"}} href='/end-month'>Натисни тук</Link>  
                        </FlexBox>
                        
                    </MessageBox>,
                    document.body
                )
            }
        </FlexBox>
    )
}

export default References;