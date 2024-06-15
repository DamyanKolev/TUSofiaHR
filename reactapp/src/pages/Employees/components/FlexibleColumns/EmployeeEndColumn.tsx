import { Dispatch, FC, SetStateAction } from 'react';
import { FCLLayout, Form, FormGroup, Button, Bar, Page, ButtonDesign } from "@ui5/webcomponents-react";
import { useAppDispatch } from '@store/storeHooks';
import { useForm } from 'react-hook-form';
import { EmployeeDataInsertSchema } from '@pages/Employees/models/schemes/EmployeeDataSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import CreatePersonalDataForm from '../Forms/personalData/CreatePersonalDataForm';
import CreateEmployeeForm from '../Forms/employee/CreateEmployeeForm';
import CreateContractForm from '../Forms/contract/CreateContractForm';
import CreateAddressForm from '../Forms/address/CreateAddressForm';
import CreateInsuranceForm from '../Forms/insurance/CreateInsuranceForm';
import { defaultEmployeeDataInsert, EmployeeDataInsert } from '@pages/Employees/models/EmployeeData';
import { EndColumnEnum } from '@pages/Employees/models/EndColumnEnum';
import { toggle } from '@/store/slices/toggleSlice';
import { submitPostForm } from '@/utils/requests';



interface EmployeeEndColumnProps {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    tableURL: string,
    setEndColumnOption: Dispatch<SetStateAction<EndColumnEnum>>
}


const EmployeeEndColumn: FC<EmployeeEndColumnProps> = ({setLayout, tableURL, setEndColumnOption}) => {
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        reset,
        control,
        setValue,
        getValues,
        formState,
    } = useForm<EmployeeDataInsert>({
        defaultValues: defaultEmployeeDataInsert,
        mode: "onChange",
        resolver: zodResolver(EmployeeDataInsertSchema),
    });

    const setDefaultValues = () => {
        setLayout(FCLLayout.OneColumn)
        reset(defaultEmployeeDataInsert)            
        setEndColumnOption(EndColumnEnum.None)
    }

    const navBackClick = ():void => {
        setDefaultValues()
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const onSubmit = (data: EmployeeDataInsert) => {
        try {
            const formData = JSON.stringify(data, null, 2)
            submitPostForm(`${tableURL}/create`, formData, successCalback)
            reset(defaultEmployeeDataInsert)  
        }
        catch (error) {
            console.error(error)
        }
    };



    return (
        <Page
                header={
                    <Bar
                        startContent={
                            <Button icon="nav-back" design={ButtonDesign.Transparent} onClick={navBackClick}/>
                        }
                    />
                }
                footer={
                    <Bar
                        endContent={
                            <Button onClick={handleSubmit(onSubmit)}>Запази</Button>
                        }
                    />
                }
            >
                <Form
                    labelSpanM={4}
                    titleText="Нов Служител"
                >
                    <FormGroup titleText='Информация за служителя'>
                        <CreateEmployeeForm
                            control={control}
                            formState={formState}
                        />
                    </FormGroup>

                    <FormGroup titleText='Лични данни'>
                        <CreatePersonalDataForm
                            control={control}
                            formState={formState}
                        />
                    </FormGroup>

                    <FormGroup titleText='Адрес'>
                        <CreateAddressForm
                            control={control}
                            formState={formState}
                        />
                    </FormGroup>

                    <FormGroup titleText='Осигуровки'>
                        <CreateInsuranceForm
                            control={control}
                            formState={formState}
                            setValue={setValue}
                            getValues={getValues}
                        />
                    </FormGroup>

                    <FormGroup titleText='Договор'>
                        <CreateContractForm
                            control={control}
                            formState={formState}
                        />
                    </FormGroup>
                </Form>
            </Page>
    )
}

export default EmployeeEndColumn;