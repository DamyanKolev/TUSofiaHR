import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import { FC } from "react";



const HRProductSwitch: FC = () => {

    return (
        <ProductSwitch>
            <ProductSwitchItem
                icon="employee"
                targetSrc="/hr/employee"
                titleText="Служители"
                subtitleText="Служители"
            />

            <ProductSwitchItem
                icon="BusinessSuiteInAppSymbols/icon-contract"
                targetSrc="/hr/contract"
                titleText="Договори"
                subtitleText="Договори"
            />

            <ProductSwitchItem
                icon="insurance-life"
                targetSrc="/hr/insurance"
                titleText="Осигуровки"
                subtitleText="Осигуровки"
            />

            <ProductSwitchItem
                icon="company-view"
                targetSrc="/hr/department"
                titleText="Структурни Единици"
                subtitleText="Структурни Единици"
            />

            <ProductSwitchItem
                icon="suitcase"
                targetSrc="/hr/position"
                titleText="Позиции"
                subtitleText="Позиции"
            />

            <ProductSwitchItem
                icon="detail-view"
                targetSrc="/hr/references"
                titleText="Справки"
                subtitleText="Справки"
            />
        </ProductSwitch>
    )
}


export default HRProductSwitch