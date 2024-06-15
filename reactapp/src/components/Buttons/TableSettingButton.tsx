import { FC, Fragment, useState } from "react";
import { Bar, BarDesign, Button, ButtonDesign, Dialog, Title, TitleLevel } from "@ui5/webcomponents-react";


const dialogStyle = {
    width: "40rem",
    maxWidth: "40rem",
    height: "35rem",
    maxHeight: "35rem",
}



const TableSettingButton: FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [buttonTitle, setButtonTitle] = useState<string>("Show Selected")

    const settingOnClick = () => {
        setOpen(true)
    }

    const showHideOnClick = () => {
        if (buttonTitle.localeCompare("Show All") == 0){
            setButtonTitle("Show Selected")
        }
        else if (buttonTitle.localeCompare("Show Selected") == 0) {
            setButtonTitle("Show All")
        }
    }

    return(
        <Fragment>
            <Button icon="settings" onClick={settingOnClick}/>
            <Dialog
                style={dialogStyle}
                open={open}
                header={
                    <Bar
                        design={BarDesign.Footer}
                        endContent={<Button design={ButtonDesign.Transparent}>Reset</Button>}
                        startContent={<Title level={TitleLevel.H3}>Настройки</Title>}
                    />
                }
                footer={
                    <Bar 
                        endContent={
                            <>
                                <Button design={ButtonDesign.Emphasized}>Cancel</Button>
                                <Button design={ButtonDesign.Transparent}>OK</Button>
                            </>
                        }
                    />
                }
            >


                <Bar
                    design={BarDesign.Subheader}
                    endContent={
                    <Button design={ButtonDesign.Transparent} onClick={showHideOnClick}>{buttonTitle}</Button>
                }
                />

                
            </Dialog>
        </Fragment>
    )
}

export default TableSettingButton