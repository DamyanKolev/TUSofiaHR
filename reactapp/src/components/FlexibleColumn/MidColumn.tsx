import { FC, ReactNode } from 'react';
import { Bar, Button } from "@ui5/webcomponents-react";

interface MidColumnProps {
    children: ReactNode;
    onClick: () => void;
}

const MidColumn: FC<MidColumnProps> = ({ children, onClick }) => {
    return (
        <div>
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
        </div>
    )
}

export default MidColumn;