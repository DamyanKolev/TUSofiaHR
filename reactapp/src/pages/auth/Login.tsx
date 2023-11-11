//import "./Login.css"
import { Button, Form, FormItem, Input } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { useState } from "react";


export default function Login() {
    const [username, setUsername] = useState<String | undefined>("");
    const [password, setPassword] = useState<String | undefined>("");

    const submitHandler = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        };

        fetch("/api/login", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = "/home";
                } else {
                    alert("invalid username or password");

                    setUsername("");
                    setPassword("");
                }
            });
    };

    return (
        <div>

            <Form className="main-container"
                backgroundDesign="Transparent"
                titleText="Sign In"
            >
                <FormItem label="Username">
                    <Input
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </FormItem>

                <FormItem label="Password">
                    <Input
                        type="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormItem>

                <FormItem>
                    <Button type="Submit" onClick={submitHandler}>
                        Sign In
                    </Button>
                </FormItem>
            </Form>
        </div>
    )
}