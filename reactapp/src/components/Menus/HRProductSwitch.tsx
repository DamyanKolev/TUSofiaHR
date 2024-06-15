import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import { FC } from "react";





const HRProductSwitch: FC = () => {

    return (
        <ProductSwitch>
            <ProductSwitchItem
                icon="employee"
                targetSrc="/employee"
                titleText="Служители"
                subtitleText="Служители"
            />

            <ProductSwitchItem
                icon="BusinessSuiteInAppSymbols/icon-contract"
                targetSrc="/contract"
                titleText="Договори"
                subtitleText="Договори"
            />

            <ProductSwitchItem
                icon="insurance-life"
                targetSrc="/end-month"
                titleText="Приключва на месеца"
                subtitleText="Приключва на месеца"
            />

            <ProductSwitchItem
                icon="company-view"
                targetSrc="/department"
                titleText="Структурни Единици"
                subtitleText="Структурни Единици"
            />

            <ProductSwitchItem
                icon="suitcase"
                targetSrc="/position"
                titleText="Позиции"
                subtitleText="Позиции"
            />

            <ProductSwitchItem
                icon="detail-view"
                targetSrc="/references"
                titleText="Справки"
                subtitleText="Справки"
            />
        </ProductSwitch>
    )
}


export default HRProductSwitch