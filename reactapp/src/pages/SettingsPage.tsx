import { Theme, themes } from "@models/Themes"
import { 
    Option, FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Page, Select, Title, TitleLevel, Ui5CustomEvent, SelectDomRef, 
    Bar,
    Button,
    BarDesign,
    ButtonDesign
} from "@ui5/webcomponents-react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { CSSProperties, FC, useState} from "react"
import { setTheme, getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import CompanySelect from "@components/Selects/CompanySelect";


const divSeparator: CSSProperties= {
    borderTop: "0.01rem solid #dcdcdc",
    width: "100%",
}


const SettingsPage: FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>("")
    const [disable, setDisabled] = useState<boolean>(true)
    const storageTheme = localStorage.getItem("theme")
    const currentTheme = storageTheme? storageTheme : getTheme()

    const onSave = () => {
        if (selectedTheme) {
            setTheme(selectedTheme)
            window.localStorage.setItem('theme', selectedTheme);
            setDisabled(true)
        }
    }

    const onChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const selectedOption = event.detail.selectedOption
        const theme = selectedOption.dataset.theme
        if (theme) {
            setSelectedTheme(theme)
            setTheme(theme)
            if (disable) {setDisabled(false)}
        }
    }


    return (
        <Page 
            style={{backgroundColor: "var(--sapPageHeader_Background)"}}
            footer={
                <Bar
                    design={BarDesign.Footer}
                    endContent={<Button design={ButtonDesign.Emphasized} onClick={onSave} disabled={disable}>Запази</Button>}
                />
            }
        >
            <FlexBox direction={FlexBoxDirection.Column}>
            <div style={{...divSeparator, margin: "0 0 1rem 0"}}></div>
                <FlexBox style={{padding:"0 3rem"}} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween}> 
                    <Title level={TitleLevel.H4}>Избор на тема</Title>
                    <Select onChange={onChange} style={{width: "15rem"}}>
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
                <div style={{...divSeparator, margin: "4rem 0 1rem 0"}}></div>
                <CompanySelect/>
            </FlexBox>
        </Page>
    )
}

export default SettingsPage