import { FC, ReactNode, createContext, useState } from 'react';
import { Bar, Button, FCLLayout } from "@ui5/webcomponents-react";


export const EndColumnContext = createContext<boolean>(false);


interface EndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    createForm: ReactNode
}

const EndColumn: FC<EndColumnProps> = ({ handleLayoutState, createForm }) => {
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
            {createForm}
        </EndColumnContext.Provider>
    )
}

export default EndColumn;