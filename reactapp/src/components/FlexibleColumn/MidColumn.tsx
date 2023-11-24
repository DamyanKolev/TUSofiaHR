import { FC, useContext } from 'react';
import { Bar, Button, FCLLayout } from "@ui5/webcomponents-react";
import UpdateContractForm from '@components/forms/update-forms/UpdateContractForm';
import { TableContext } from './FlexibleColumn';
import UpdateEmployeeForm from '@components/forms/update-forms/UpdateEmployeeForm'


interface MidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
}

const MidColumn: FC<MidColumnProps> = ({ handleLayoutState }) => {

    const navBackClick = () => {
        handleLayoutState(FCLLayout.OneColumn)
    }

    return (
        <div>
            <div className="table-header-bar">
                <Bar startContent={
                    <Button
                        design="Transparent"
                        icon="nav-back"
                        onClick={navBackClick}
                    >
                    </Button>
                }
                >
                </Bar>
            </div>
            <StandartUpdateForm />
        </div>
    )
}


const StandartUpdateForm: FC = () => {
    const tableName = useContext(TableContext)

    if (tableName.localeCompare("employee") == 0) {
        return (<UpdateEmployeeForm />)
    }
    else if (tableName.localeCompare("contract") == 0) {
        return (<UpdateContractForm />)
    }
}


export default MidColumn;