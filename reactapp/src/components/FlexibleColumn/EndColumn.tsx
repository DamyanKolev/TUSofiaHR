import { FC, createContext, useContext, useState } from 'react';
import { Bar, Button, FCLLayout } from "@ui5/webcomponents-react";
import CreateEmployeeForm from '@components/forms/create-forms/CreateEmployeeForm';
import CreateContractForm from '@components/forms/create-forms/CreateContractForm';
import { TableContext } from './FlexibleColumn';


export const EndColumnContext = createContext<boolean>(false);


interface EndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
}

const EndColumn: FC<EndColumnProps> = ({ handleLayoutState }) => {
    const [isClicked, setIsClicked] = useState<boolean>(false)

    const navBackClick = () => {
        handleLayoutState(FCLLayout.OneColumn)
        setIsClicked(!isClicked)
    }

    return (
        <EndColumnContext.Provider value={isClicked}>
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
            <StandartCreateForm />
        </EndColumnContext.Provider>
    )
}


const StandartCreateForm: FC = () => {
    const tableName = useContext(TableContext)

    if (tableName.localeCompare("employee") == 0) {
        return (<CreateEmployeeForm />)
    }
    else if (tableName.localeCompare("contract") == 0) {
        return (<CreateContractForm />)
    }
    
}

export default EndColumn;