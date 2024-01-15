import { Bar, FlexBox, FlexBoxDirection, SegmentedButton, SegmentedButtonItem, Select, Option, Button, ButtonDesign, BarDesign, Calendar, CalendarDomRef, ResponsivePopover, List, StandardListItem } from "@ui5/webcomponents-react"
import { CSSProperties, FC, Fragment, useRef, useState } from "react"
import "@ui5/webcomponents-icons/slim-arrow-left"
import "@ui5/webcomponents-icons/slim-arrow-right"
import "@ui5/webcomponents-icons/legend"
import "@ui5/webcomponents-icons/employee"


const timelineContainer: CSSProperties = {
    width: "calc(100vw - 23.8rem)",
    height: "4rem",
    gap: "0rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
    gridTemplateRows: "1fr"
}

const test1: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRight: "#e5e5e5 solid .12rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
    gridTemplateRows: "1fr",
    display: "grid",
    gap: "0rem"
}

const test2:CSSProperties = {
    width: "100%",
    height: "100%",
    borderLeft: "#e5e5e5 solid .0625rem",
}

const Schedule: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const test = useRef<CalendarDomRef>(null)

    const popoverOpenerOnClick = () =>{
        setIsOpen(true)
    }

    const popoverOnAfterClose = () => {
        setIsOpen(false)
    }

    return (
        <FlexBox direction={FlexBoxDirection.Column} className="flexible-columns ui5-content-density-compact">
            <Bar
                design={BarDesign.Subheader}
                endContent={
                    <Fragment>
                        <SegmentedButton>
                            <Fragment key=".0">
                                <SegmentedButtonItem pressed>Ден</SegmentedButtonItem>
                                <SegmentedButtonItem>Седмица</SegmentedButtonItem>
                                <SegmentedButtonItem>Месец</SegmentedButtonItem>
                            </Fragment>
                        </SegmentedButton>
                        <Select style={{maxWidth: "10rem"}}>
                            <Option>Option 1</Option>
                        </Select>
                        <Button design={ButtonDesign.Transparent}>Добави</Button>
                        <Button design={ButtonDesign.Transparent} icon="legend"/>
                    </Fragment>
                }
            />

            <Bar
                design={BarDesign.Subheader}
                startContent={
                    <Fragment>
                        <Button design={ButtonDesign.Transparent} icon="slim-arrow-left"/>
                        <Button design={ButtonDesign.Transparent}>Днес</Button>
                        <Button design={ButtonDesign.Transparent} icon="slim-arrow-right"/>
                        <Button design={ButtonDesign.Transparent} id="popoverOpener"onClick={popoverOpenerOnClick}>Тест</Button>
                    </Fragment>
                }
            />


            <ResponsivePopover
                className="footerPartNoPadding"
                onAfterClose={popoverOnAfterClose}
                opener={'popoverOpener'}
                horizontalAlign="Center"
                placementType="Top"
                verticalAlign="Center"
                hideArrow
                open={isOpen}
            >
                <Calendar ref={test}/>
            </ResponsivePopover>

            
            <List
                >
                <StandardListItem description="test">
                    List Item 1
                </StandardListItem>
            </List>

            <div style={timelineContainer} >
                <div style={test1}>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                    </div>
                    <div style={test1}>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                    </div>
                    <div style={test1}>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                    </div>
                    <div style={test1}>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                        <div style={test2}></div>
                    </div>
            </div>
        </FlexBox>
    )
}

export default Schedule