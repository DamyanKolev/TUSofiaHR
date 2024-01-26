import { Fragment, useEffect, useState } from "react";
import { Button, FlexBox, FlexBoxDirection, Input, InputDomRef, Label, Title, Ui5CustomEvent } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { useNavigate } from "react-router-dom";
import { LoginRequest, defaultLoginRequest } from "@/models/LoginRequest";
import { Company } from "@/models/HR/Company";
import { isJWTTokenValid } from "@/utils/auth";
import { getData } from "@/utils/getData";
import { createPortal } from "react-dom";
import CompanyDialog from "@/components/Dialogs/CompanyDialog";
import InitWizardDialog from "@/components/Dialogs/InitWizardDialog";


export interface InitAccountModel {
    isSelectedCompany: boolean,
    isCreated: boolean
}

const defaultInitAccountModel: InitAccountModel= {
    isSelectedCompany: false,
    isCreated: false
}


export default function Login() {
    const [formData, setFormData] = useState<LoginRequest>(defaultLoginRequest);
    const [dialogSwitch, setDialogSwitch] = useState<InitAccountModel>(defaultInitAccountModel);
    const [isCreated, setIsCreated] = useState<boolean>(true)
    const [companies, setCompanies] = useState<Array<Company>>([])
    const navigate = useNavigate();

    const initState = async () => {
        const result = await isJWTTokenValid()
        if (result) {
            localStorage.setItem("isLoginIn", JSON.stringify(true));
            navigate("/")
        }
    }


    const init = async () => {
        const allCompanies = await getData<Array<Company>>("/backend/api/hr/company/all")
        const isDataCreated = await getData<boolean>("/backend/api/hr/is-created")
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


    const submitHandler = async () => {
        const response = await fetch("/backend/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const res = await response.json();
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isLoginIn", JSON.stringify(true));
            init()
        } else {
            alert("invalid username or password");
            setFormData(defaultLoginRequest);
        }
    };

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData({ ...formData, [name]: value });
        }
    };

    useEffect(()=>{
        initState()
    },[])

    return (
        <Fragment>
            <div className="login-container">
                <FlexBox
                    direction={FlexBoxDirection.Column}
                    className="main-container"
                >
                    <Title>Sign In</Title>
                    <FlexBox direction={FlexBoxDirection.Column}>
                        <Label>Username</Label>
                        <Input 
                            name="username" 
                            value={formData.username} 
                            onChange={handleInputChange} 
                        />
                    </FlexBox>

                    <FlexBox direction={FlexBoxDirection.Column}>
                        <Label>Password</Label>
                        <Input 
                            name="password" 
                            type="Password" 
                            value={formData.password} 
                            onChange={handleInputChange} 
                        />
                    </FlexBox>

                    <FlexBox>
                        <Button type="Submit" onClick={submitHandler}>Sign In</Button>
                    </FlexBox>
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
        </Fragment>
    );
}