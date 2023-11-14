import React, { FC, ReactNode } from 'react';
import { Bar, Button } from "@ui5/webcomponents-react";

interface EndColumnProps {
    children: ReactNode;
    onClick: () => void;
}

const EndColumn: FC<EndColumnProps> = ({ children, onClick }) => {
    return (
        <React.Fragment>
            <div className="table-header-bar">
                <Bar startContent={
                    <Button
                        design="Transparent"
                        icon="nav-back"
                        onClick={onClick}
                    >
                    </Button>
                }
                >
                </Bar>
            </div>
            {children}
        </React.Fragment>
    )
}

export default EndColumn;