import { RadioButton, RadioButtonDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
    options: Array<string>
    control: Control<T>
    name: FieldPath<T>;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

function WrappedRadioButtons<T extends FieldValues>({ options, control, name, rules }: Props<T>) {
    const { field, fieldState } = useController({control, name, rules });

    const handleOnChange = (event: Ui5CustomEvent<RadioButtonDomRef, never>) => {
        const checked = event.target.checked
        if (checked) {
            const value = event.target.text
            field.onChange(value)
        }
    }

    return (
        <>
            {
                options.map((value, key) => {
                    return (
                        <RadioButton
                            key={key}
                            text={value}
                            {...control.register(name)}
                            onChange={handleOnChange}
                            valueState={fieldState.error ? ValueState.Error : ValueState.None}
                        />
                    )
                })
            }
        </>
    )
}

export default WrappedRadioButtons