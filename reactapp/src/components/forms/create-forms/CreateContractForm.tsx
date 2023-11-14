import { Button, Form, FormItem, Input } from "@ui5/webcomponents-react";
import { FC } from "react";





const CreateContractForm: FC = () => {
    const submitForm = async () => {
        //const form: HTMLFormElement = document.getElementById("test-form") as HTMLFormElement
        //console.log("erimgeieigmerign")
        //if (form != null) {
        //    const test = await getObjectFromFormData(form)
        //    console.log(test)
        //}

        //const contract = {
        //    workingWage: 123.456,
        //    workTime: 12,
        //    conclusionDate: new Date(2023, 7, 20),
        //}

        //const contract = {
        //    "workingWage": 0,
        //    "workTime": 0,
        //    "conclusionDate": "0001-01-01"
        //}

        //const options = {
        //    method: "POST",
        //    headers: {
        //        "Content-Type": "application/json",
        //    },
        //    body: JSON.stringify(contract),
        //    mode: "no-cors",
        //};

        //fetch("https://localhost:7057/create1", options)
        //    .then((response) => {
        //        if (response.ok) {
        //            console.log(response);
        //        } else {
        //            console.log(response.statusText);
        //        }
        //    })
        //    .catch((error) => {
        //        console.log(error);
        //    });
        console.log("HEIWINWINIENFEI")
    };

    return (
        <Form id="create-form">
            <FormItem label="Working Wage">
                <Input name="WorkingWage"></Input>
            </FormItem>

            <FormItem label="Work Time">
                <Input name="WorkTime"></Input>
            </FormItem>

            <FormItem label="Conclusion Date">
                <Input name="ConclusionDate"></Input>
            </FormItem>

            <FormItem>
                <Button onClick={submitForm}>Create</Button>
            </FormItem>
        </Form>
    )
}

export default CreateContractForm;