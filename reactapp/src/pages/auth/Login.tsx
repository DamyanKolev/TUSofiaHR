import { Fragment, useState, useEffect  } from "react";
import { Button, ButtonDesign, CheckBox, CheckBoxDomRef, FlexBox, FlexBoxDirection, Input, InputDomRef, Label, MessageBox, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { useNavigate } from "react-router-dom";
import { LoginDTO, defaultLoginDTO } from "@models/Auth/LoginDTO";
import { createPortal } from "react-dom";
import "./Login.css"
import { AuthTokens } from "@models/Auth/AuthTokens";
import { UserData } from "@/models/Auth/UserData";


export interface InitAccountModel {
    isSelectedCompany: boolean,
    isCreated: boolean
}

export default function Login() {
    const [formData, setFormData] = useState<LoginDTO>(defaultLoginDTO);
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)
    const navigate = useNavigate();


    const setToken = (tokens: AuthTokens) => {
        if (rememberMe) {
            localStorage.setItem("refreshToken", tokens.refreshToken);
            localStorage.setItem("rememberMe", JSON.stringify(true));
        }
        else {
            sessionStorage.setItem("refreshToken", tokens.refreshToken);
            localStorage.setItem("rememberMe", JSON.stringify(false));
        }
        sessionStorage.setItem("isLoginIn", JSON.stringify(true));
        sessionStorage.setItem("accessToken", tokens.accessToken);
    }

    const submitHandler = async () => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            }),
        });

        if (response.ok) {
            const res = await response.json();
            const data = res.data as UserData
            navigate("/")
            setToken(data.tokens)
            sessionStorage.setItem("companyEIC", data.company.companyEic);
        } else {
            setErrorMsg("Невалидно потребителско име или парола")
            setIsError(true)
            setFormData(defaultLoginDTO);
        }
    };

    const onInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const { name, value } = event.target;
        if (name) {
            setFormData({ ...formData, [name]: value });
        }
    }


    const handleOnChange = (event: Ui5CustomEvent<CheckBoxDomRef, never>) => {
        const checked = event.target.checked
        if (checked) {
            setRememberMe(checked)
        }
    }

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                submitHandler();
            }
        };
        addEventListener("keydown", listener);

        return () => {
            removeEventListener("keydown", listener);
        };
    }, []);


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
                            name="username" 
                            value={formData.username} 
                            onInput={onInput}
                            style={{width:"18rem"}}
                        />
                    </FlexBox>

                    <FlexBox direction={FlexBoxDirection.Column}>
                        <Label>Password</Label>
                        <Input 
                            name="password" 
                            type="Password" 
                            value={formData.password} 
                            onInput={onInput}
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