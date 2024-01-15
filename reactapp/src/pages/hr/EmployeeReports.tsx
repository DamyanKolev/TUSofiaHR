import { FC, Fragment } from 'react';
import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons-business-suite/contract"
import "@ui5/webcomponents-icons/company-view"
import "@ui5/webcomponents-icons/calendar"
import "@ui5/webcomponents-icons/detail-view"
import "@ui5/webcomponents-icons/suitcase"
import PageBar from '@components/Bars/PageBar';

const EmployeeReports: FC = () => {
    return (
       <Fragment>
            <PageBar/>
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
                    icon="company-view"
                    targetSrc="/hr/department"
                    titleText="Отдели"
                    subtitleText="Отдели"
                />

                <ProductSwitchItem
                    icon="suitcase"
                    targetSrc="/hr/position"
                    titleText="Позиции"
                    subtitleText="Позиции"
                />

                <ProductSwitchItem
                    icon="calendar"
                    targetSrc="/hr/schedule"
                    titleText="График"
                    subtitleText="График"
                />

                <ProductSwitchItem
                    icon="detail-view"
                    targetSrc="/hr/references"
                    titleText="Справки"
                    subtitleText="Справки"
                />
            </ProductSwitch>
       </Fragment>
    )
}

export default EmployeeReports;