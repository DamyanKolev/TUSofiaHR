import { RadioButton, Text, RadioButtonDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

interface Props<T extends FieldValues> {
    textFieldWidth?: string,
    buttonsValues: Array<string>,
    editMode: boolean;
    control: Control<T>
    name: FieldPath<T>;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}



export function StandardRadioButtonField<T extends FieldValues>(
    {textFieldWidth = "15.625rem", buttonsValues, editMode, name, control, rules}: Props<T>
) {
    const { field, fieldState } = useController({control, name, rules });
    const handleOnChange = (event: Ui5CustomEvent<RadioButtonDomRef, never>) => {
        const checked = event.target.checked
        if (checked) {
            const value = event.target.text
            field.onChange(value)
        }
    }


    if (editMode) {
        return <Fragment>
            {
                buttonsValues.map((btnValue, key) => {
                    if (field.value === btnValue) {
                        return <RadioButton
                            checked={true}
                            key={key}
                            text={btnValue}
                            {...control.register(name)}
                            onChange={handleOnChange}
                            valueState={fieldState.error ? ValueState.Error : ValueState.None}
                        />
                    }
                    return <RadioButton
                        key={key}
                        text={btnValue}
                        {...control.register(name)}
                        onChange={handleOnChange}
                        valueState={fieldState.error ? ValueState.Error : ValueState.None}
                    />
                })
            }
        </Fragment>
    }


    return (
        <Text style={{width:textFieldWidth}}>
            {field.value}
        </Text>
    )
}