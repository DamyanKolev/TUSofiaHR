import { Form, Input, ValueState } from "@ui5/webcomponents-react"
import { FormItem } from "@ui5/webcomponents-react/ssr"
import { Fragment, useState } from "react"
import { PositionDTO } from "@models/HR/Position"
import { PositionFormState } from "@models/FormStates/PositionFormState"





const CreatePositionForm: FC = () => {
    const defaultFormData = {} as PositionDTO
    const [formData, setFormData] = useState<PositionDTO>(defaultFormData);
    const [formState, setFormState] = useState<PositionFormState>(defaultFormState);

    const isFilledForm = (): boolean => {
        let isFilled: boolean = true;

        const setValueState = (valueState: ValueState): void => {
            let currentState = formState
            for (const [key, value] of Object.entries(formState)) {

                if (!value.isFilled) {
                    currentState = { ...currentState, [key]: { ...value, "valueState": valueState } }
                    isFilled = false;
                }
            }
            setFormState(currentState);
        };

        if (!isFilled) {
            setValueState(ValueState.Error);
            setTimeout(() => {
                setValueState(ValueState.None);
            }, 1000);
        }

        return isFilled;
    };

    return (
        <Fragment>
            <Form>
                <FormItem>
                    <Input
                        name="FirstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        valueState={formState.firstName.valueState}
                        data-type={DataType.String}
                    />
                </FormItem>
            </Form>
        </Fragment>
    )
}

export default CreatePositionForm