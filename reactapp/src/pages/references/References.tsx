import { FC, Fragment } from 'react';
import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons-business-suite/contract"
import PageBar from '@components/Bars/PageBar';

const References: FC = () => {
    return (
        <Fragment>
            <PageBar title='Справки'/>
            <ProductSwitch>
                <ProductSwitchItem
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    targetSrc="/hr/references/article62"
                    titleText="Договори"
                    subtitleText="Член 62 от закона за ТД"
                />

                <ProductSwitchItem
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    targetSrc="/hr/references/article123"
                    titleText="Договори"
                    subtitleText="Член 123 от закона за ТД"
                />
            </ProductSwitch>
        </Fragment>
    )
}

export default References;