import { CSSProperties, FC, Fragment, useEffect, useState } from 'react';
import { AnalyticalTableColumnDefinition, Bar, BarDesign, Button, ButtonDesign, FlexBox, FlexBoxAlignItems, FlexBoxDirection, MessageBox, MessageBoxActions, Text } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/excel-attachment"
import SmartTable from '@components/Table/SmartTable';


const tableStyle: CSSProperties = {
    height: "100%",
    maxHeight: "calc(100vh - 6.48rem)"   
}


interface StartColumnProps {
    tableURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
    onRowClick: (event: any) => void,
}


const StartColumn: FC<StartColumnProps> = ({ tableURL, columns, tableTitle, onRowClick}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    const endButtonOnClick = () => {
        setOpen(true)
    }

    const onSuccessCalback = async () => {
        try {
            const result = await postRequest("/api/hr/end-month/is-filled")
            setDisabled(!result.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const postRequest = async (postUrl: string) => {
        const token = sessionStorage.getItem("accessToken")
        const response = await fetch(postUrl, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const json = await response.json()

        if (response.ok) {
            return json
        }
        else {
            throw Error(json.message)
        }
    }

    const handleClose = async (event: CustomEvent<{ action: string; }>) => {
        try {
            if (event.detail.action === MessageBoxActions.OK) {
                const messageData = await postRequest("/api/hr/end-month/finish")
                console.log(messageData)
            } 
            setOpen(false);
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        onSuccessCalback()
    }, [])

    return (
        <Fragment>
            <SmartTable
                title={tableTitle}
                style={tableStyle}
                tableURL={tableURL}
                columns={columns}
                onRowClick={onRowClick}
                onSuccessCalback={onSuccessCalback}
                header={
                    <Bar 
                        design={BarDesign.Subheader}
                        endContent={
                            <Fragment>
                                <Button design={ButtonDesign.Transparent} disabled={disabled} onClick={endButtonOnClick}>Приключване</Button>
                            </Fragment>
                        }
                    />
                }
            />


            <MessageBox
                open={open}
                onClose={handleClose}
                actions={[MessageBoxActions.Cancel, MessageBoxActions.OK]}
                titleText="Операцията е необратима"
            >
                <FlexBox direction={FlexBoxDirection.Column} style={{padding:"1rem 1rem 2rem 1rem", width:"100%"}} alignItems={FlexBoxAlignItems.Center}>
                    <Text>След потвърждение, няма да можете</Text>
                    <Text>повече да променяте данните.</Text>
                </FlexBox>
            </MessageBox>
        </Fragment>
    )
}

export default StartColumn;