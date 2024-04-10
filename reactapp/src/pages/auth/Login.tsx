import { Fragment, useState } from "react";
import { Button, ButtonDesign, CheckBox, CheckBoxDomRef, FlexBox, FlexBoxDirection, Input, InputDomRef, Label, MessageBox, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { useNavigate } from "react-router-dom";
import { LoginDTO, defaultLoginDTO } from "@models/Auth/LoginDTO";
import { Database } from "@models/Auth/Database";
import { getData } from "@utils/getData";
import { createPortal } from "react-dom";
import CompanyDialog from "@components/Dialogs/CompanyDialog";
import InitWizardDialog from "@components/Dialogs/InitWizardDialog";
import "./Login.css"
import { AuthTokens } from "@models/Auth/AuthTokens";


export interface InitAccountModel {
    isSelectedCompany: boolean,
    isCreated: boolean
}

const defaultInitAccountModel: InitAccountModel= {
    isSelectedCompany: false,
    isCreated: false
}

export default function Login() {
    const [formData, setFormData] = useState<LoginDTO>(defaultLoginDTO);
    const [dialogSwitch, setDialogSwitch] = useState<InitAccountModel>(defaultInitAccountModel);
    const [isCreated, setIsCreated] = useState<boolean>(true)
    const [companies, setCompanies] = useState<Array<Database>>([])
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)
    const navigate = useNavigate();

    const init = async () => {
        const allCompanies = await getData<Array<Database>>("/auth/company/all")
        const isDataCreated = await getData<boolean>("/api/hr/is-created")
        if(allCompanies != null && isDataCreated != null) {
            if(allCompanies.length > 1){
                setCompanies(allCompanies)
                setIsCreated(isDataCreated)
                setDialogSwitch({...dialogSwitch, isSelectedCompany:true})
            }
            else {
                if(!isDataCreated) {
                    setDialogSwitch({...dialogSwitch, isCreated:true})
                }
                else {
                    navigate("/")
                }
            }
        }
    }

    const setToken = (tokens: AuthTokens) => {
        if (rememberMe) {
            localStorage.setItem("refreshToken", tokens.refresh_token);
            localStorage.setItem("rememberMe", JSON.stringify(true));
        }
        else {
            sessionStorage.setItem("refreshToken", tokens.refresh_token);
            localStorage.setItem("rememberMe", JSON.stringify(false));
        }
        sessionStorage.setItem("isLoginIn", JSON.stringify(true));
        sessionStorage.setItem("accessToken", tokens.access_token);
    }

    const submitHandler = async () => {
        const response = await fetch("/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const res = await response.json();
            setToken(res.data)
            init()
        } else {
            setErrorMsg("Невалидно потребителско име или парола")
            setIsError(true)
            setFormData(defaultLoginDTO);
        }
    };

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleOnChange = (event: Ui5CustomEvent<CheckBoxDomRef, never>) => {
        const checked = event.target.checked
        setRememberMe(checked)
    }


    return (
        <Fragment>
            <div className="login-container">
                <FlexBox
                    direction={FlexBoxDirection.Column}
                    className="main-container"
                >
                    <Title level={TitleLevel.H3}>Sign in</Title>
                    <FlexBox direction={FlexBoxDirection.Column}>
                        <Label>Username</Label>
                        <Input 
                            name="username_or_email" 
                            value={formData.username_or_email} 
                            onChange={handleInputChange} 
                            style={{width:"18rem"}}
                        />
                    </FlexBox>

                    <FlexBox direction={FlexBoxDirection.Column}>
                        <Label>Password</Label>
                        <Input 
                            name="password" 
                            type="Password" 
                            value={formData.password} 
                            onChange={handleInputChange} 
                            style={{width:"18rem"}}
                        />
                    </FlexBox>

                    <CheckBox
                        style={{padding: ""}}
                        onChange={handleOnChange}
                        text="Запомни ме"
                        valueState="None"
                    />

                    <div>
                        <Button type="Submit" onClick={submitHandler} design={ButtonDesign.Emphasized}>Sign in</Button>
                    </div>
                </FlexBox>
            </div>

            {dialogSwitch.isSelectedCompany && 
                createPortal(<CompanyDialog
                    getSelected={() => {return dialogSwitch.isSelectedCompany}}
                    setIsSelected={setDialogSwitch}
                    getCompanies={() => {return companies}}
                    getIsCreated={() => {return isCreated}}
                />, document.body)
            }
            {dialogSwitch.isCreated && 
                createPortal(<InitWizardDialog
                    getSelected={() => {return dialogSwitch.isCreated}}
                    setIsSelected={(isSelected: boolean) => {setDialogSwitch({...dialogSwitch, isCreated:isSelected})}}
                />, document.body)
            }

            {
                createPortal(
                    <MessageBox
                        open={isError}
                        type="Error"
                        titleText="Грешка"
                        onClose={() => setIsError(false)}
                    >
                        <div style={{fontSize: "1rem", fontFamily: `"72", "72full", Arial, Helvetica, sans-serif`, margin:"1rem"}}>
                            {errorMsg}
                        </div>
                  </MessageBox>,
                  document.body
                )
            }
        </Fragment>
    );
}