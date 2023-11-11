import { Button, Form, FormItem, Input, InputType } from "@ui5/webcomponents-react";



//const StandardField = ({ editMode, value, inputType = InputType.None, onInput, ...rest }) => {
//    if (editMode) {
//        return <Input value={value} style={{ width: '100%' }} type={inputType} onInput={onInput} {...rest} />;
//    }
//    if (inputType === InputType.URL || inputType === InputType.Email) {
//        return (
//            <Link href={inputType === InputType.Email ? `mailto:${value}` : value} target="_blank" {...rest}>
//                {value}
//            </Link>
//        );
//    }
//    return <Text {...rest}>{value}</Text>;
//};



export default function UpdateContractForm(props) {
    //const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    //const [formState, dispatch] = useReducer(
    //    reducer,
    //    {
    //        WorkingWage: 32,
    //        WorkTime: 8,
    //        ConclusionDate: "2023/11/11",
    //    },
    //    undefined
    //);
    //const { WorkingWage, WorkTime, WorkTime } = formState;

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
                <Button onClick={}>Create</Button>
            </FormItem>
        </Form>
    )
}