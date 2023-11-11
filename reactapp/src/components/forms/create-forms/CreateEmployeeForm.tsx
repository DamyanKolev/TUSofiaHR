import { Form, FormItem, Input, Tab, TabContainer } from "@ui5/webcomponents-react";


export default function CreateEmployeeForm() {
    return (
        <Form>
            <FormItem label="First Name">
                <Input></Input>
            </FormItem>

            <FormItem label="Surname">
                <Input></Input>
            </FormItem>

            <FormItem label="Last Name">
                <Input></Input>
            </FormItem>

            <FormItem>
                <TabContainer>
                    <Tab
                        selected
                        text="Лична информация"
                    >
                        Content Tab 1
                    </Tab>

                    <Tab
                        text="Договор"
                    >
                        Content Tab 1
                    </Tab>
                </TabContainer>
            </FormItem>
        </Form>
    )
}