import PageBar from "@components/Bars/PageBar"
import Schedule from "@components/Schedule/Schedule"
import { FlexBox, FlexBoxDirection } from "@ui5/webcomponents-react"
import { FC, Fragment } from "react"




const SchedulePage: FC = () => {

    return (
        <Fragment>
            <FlexBox direction={FlexBoxDirection.Column}>
                <PageBar title="График"/>
                <Schedule/>
            </FlexBox>
        </Fragment>   
    )
}


export default SchedulePage