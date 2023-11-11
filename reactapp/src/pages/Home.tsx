import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons-business-suite/contract"
import CreateContractForm from "../components/forms/create-forms/CreateContractForm";



export default function Home() {
    return (
        //<ProductSwitch>
        //    <ProductSwitchItem
        //        icon="employee"
        //        targetSrc="/employee"
        //        titleText="Employees"
        //    />

        //    <ProductSwitchItem
        //        icon="contract"
        //        targetSrc="/contract"
        //        titleText="Contracts"
        //    />
        //</ProductSwitch>
        <CreateContractForm></CreateContractForm>
    )
}