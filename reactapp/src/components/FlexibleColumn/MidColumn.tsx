import { FC, ReactNode } from 'react';
import { Bar, Button, FCLLayout } from "@ui5/webcomponents-react";


interface MidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    updateForm: ReactNode
}

const MidColumn: FC<MidColumnProps> = ({ handleLayoutState, updateForm }) => {

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
            {updateForm}
        </div>
    )
}


export default MidColumn;