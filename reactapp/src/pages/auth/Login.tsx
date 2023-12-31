import React, { ChangeEvent, useEffect, useState } from "react";
import { BackgroundDesign, Button, Form, FormItem, Input } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { useNavigate } from "react-router-dom";

interface LoginRequest {
    username: string;
    password: string;
}

const defaultLoginRequest: LoginRequest = {
    username: "",
    password: ""
};

export default function Login() {
    const [data, setData] = useState<LoginRequest>(defaultLoginRequest);
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };


    const submitHandler = async () => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const res = await response.json();
            localStorage.setItem("token", res.data);
            navigate("/");
        } else {
            alert("invalid username or password");
            setData(defaultLoginRequest);
        }
    };

    return (
        <React.Fragment>
            <Form
                className="main-container"
                backgroundDesign={BackgroundDesign.Transparent}
                titleText="Sign In"
            >
                <FormItem label="Username">
                    <Input name="username" value={data.username} onChange={handleInputChange} />
                </FormItem>

                <FormItem label="Password">
                    <Input name="password" type="Password" value={data.password} onChange={handleInputChange} />
                </FormItem>

                <FormItem>
                    <Button type="Submit" onClick={submitHandler}>Sign In</Button>
                </FormItem>
            </Form>
        </React.Fragment>
    );
}