import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import { FC } from "react";
import "@ui5/webcomponents-icons/insurance-life"
import "@ui5/webcomponents-icons/company-view"
import "@ui5/webcomponents-icons/suitcase"
import "@ui5/webcomponents-icons/detail-view"



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
                targetSrc="/insurance"
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