import { FC, Fragment } from 'react';
import "@ui5/webcomponents-icons-business-suite/contract"
import "@ui5/webcomponents-icons/company-view"
import "@ui5/webcomponents-icons/calendar"
import "@ui5/webcomponents-icons/detail-view"
import "@ui5/webcomponents-icons/suitcase"
import "@ui5/webcomponents-icons/insurance-life"
import PageBar from '@components/Bars/PageBar';
import HRProductSwitch from '@components/Menus/HRProductSwitch';

const EmployeeReports: FC = () => {
    return (
       <Fragment>
            <PageBar url='/'/>
            <HRProductSwitch/>
       </Fragment>
    )
}

export default EmployeeReports;