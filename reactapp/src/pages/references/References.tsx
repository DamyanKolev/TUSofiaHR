import { FC, useState } from 'react';
import { FlexBox, FlexBoxDirection, ProductSwitch, ProductSwitchItem, ProductSwitchItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons-business-suite/contract"
import PageBar from '@components/Bars/PageBar';
import { createPortal } from 'react-dom';
import ReferenceDialog from '@/components/Dialogs/ReferenceDialog';

const References: FC = () => {
    const [referenceData, setReferenceData] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const onClickArticle = (event: Ui5CustomEvent<ProductSwitchItemDomRef, never>) => {
        const currRefData = event.target.dataset.table
        if (currRefData) {
            setReferenceData(currRefData)
            setOpen(true)
        }
    }

    return (
        <FlexBox direction={FlexBoxDirection.Column}>
            <PageBar title='Справки'/>
            <ProductSwitch>
                <ProductSwitchItem
                    onClick={onClickArticle}
                    data-table="article62"
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    titleText="Уведомление"
                    subtitleText="Член 62 от закона за ТД"
                />

                <ProductSwitchItem
                    onClick={onClickArticle}
                    data-table="declaration1"
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    titleText="Декларация 1"
                    subtitleText="Декларация 1"
                />

                <ProductSwitchItem
                    onClick={onClickArticle}
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
        </FlexBox>
    )
}

export default References;