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
                    titleText="Уведомление"
                    subtitleText="Член 62 от закона за ТД"
                />

                <ProductSwitchItem
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    targetSrc="/hr/references/article123"
                    titleText="Уведомление"
                    subtitleText="Член 123 от закона за ТД"
                />

                <ProductSwitchItem
                    icon="BusinessSuiteInAppSymbols/icon-contract"
                    targetSrc="/hr/references/declaration"
                    titleText="Декларации"
                    subtitleText="Декларации обр. 1,3 и 6"
                />
            </ProductSwitch>
        </Fragment>
    )
}

export default References;