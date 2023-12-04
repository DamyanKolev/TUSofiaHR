import { FC } from 'react';
import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons-business-suite/contract"
import "@ui5/webcomponents-icons/manager"

const Home: FC = () => {
    return (
        <ProductSwitch>
            <ProductSwitchItem
                icon="employee"
                targetSrc="/employee"
                titleText="Employees"
                subtitleText="Employees"
            />

            <ProductSwitchItem
                icon="BusinessSuiteInAppSymbols/icon-contract"
                targetSrc="/contract"
                titleText="Contracts"
                subtitleText="Contracts"
            />

            <ProductSwitchItem
                icon="manager"
                targetSrc="/department"
                titleText="Departments"
                subtitleText="Departments"
            />

            <ProductSwitchItem
                icon=""
                targetSrc="/position"
                titleText="Positions"
                subtitleText="Positions"
            />
        </ProductSwitch>
    )
}

export default Home;