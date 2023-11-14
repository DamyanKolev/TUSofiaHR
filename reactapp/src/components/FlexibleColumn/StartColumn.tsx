import React, { FC } from 'react';
import { Bar, Button } from "@ui5/webcomponents-react";
import { SmartTable, TableProps } from "../SmartTable";

interface StartColumnProps {
    tableProps: TableProps;
    createOnClick: () => void;
    updateOnClick: () => void;
}

const StartColumn: FC<StartColumnProps> = ({ tableProps, createOnClick, updateOnClick }) => {

    return (
        <React.Fragment>
            <div className="table-header-bar">
                <Bar
                    startContent={
                        <Button
                            design="Transparent"
                            icon="nav-back"
                            onClick={() => window.location.href = "/"}
                        >
                        </Button>
                    }

                    endContent={
                        <React.Fragment>
                            <Button onClick={createOnClick}>Create</Button>
                            <Button onClick={updateOnClick}>Update</Button>
                        </React.Fragment>
                    }
                >
                </Bar>
            </div>
            <SmartTable tableProps={tableProps} />
        </React.Fragment>
    );
}

export default StartColumn;