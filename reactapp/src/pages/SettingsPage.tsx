import { Theme, themes } from "@models/Themes"
import { 
    Bar, BarDesign, Button, Option, ButtonDesign, FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Page, Select, Title, TitleLevel, Ui5CustomEvent, SelectDomRef 
} from "@ui5/webcomponents-react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { FC} from "react"
import { setTheme, getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";


const divSeparator = {
    borderTop: "0.01rem solid #dcdcdc",
    width: "100%"
}


const Settings: FC = () => {
    const storageTheme = localStorage.getItem("theme")
    const currentTheme = storageTheme? storageTheme : getTheme()

    const onChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const selectedOption = event.detail.selectedOption
        const theme = selectedOption.dataset.theme
        if (theme) {
            setTheme(theme)
            window.localStorage.setItem('theme',theme);
        }
    }


    return (
        <Page 
            style={{backgroundColor: "white"}}
            footer={<Bar
                design={BarDesign.Footer}
                endContent={<Button design={ButtonDesign.Emphasized}>Save</Button>}
            />}
        >
            <FlexBox style={{gap:"1rem"}} direction={FlexBoxDirection.Column}>
                <div style={divSeparator}></div>
                <FlexBox style={{padding:"0 3rem 0 3rem"}} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween}> 
                    <Title level={TitleLevel.H4}>Избор на тема</Title>
                    <Select onChange={onChange}>
                        {
                            themes.map((theme: Theme, key: number) => {
                                const selected = (currentTheme === theme.themeName)? true : false

                                return (
                                    <Option key={key} data-theme={theme.themeName} selected={selected}>
                                        {theme.displayName}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </FlexBox>
            </FlexBox>
        </Page>
    )
}

export default Settings