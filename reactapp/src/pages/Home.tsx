import { FC } from 'react';
import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons-business-suite/contract"

const Home: FC = () => {
    return (
        <ProductSwitch>
            <ProductSwitchItem
                icon="employee"
                targetSrc="/employee"
                titleText="Employees"
            />

            <ProductSwitchItem
                icon="contract"
                targetSrc="/contract"
                titleText="Contracts"
            />
        </ProductSwitch>
    )
}

export default Home;