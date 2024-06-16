import { Dispatch, FC, SetStateAction } from 'react';
import { FCLLayout, Form, FormGroup, Button, Bar, ButtonDesign, DynamicPageTitle, ObjectPage, BarDesign, ObjectPageSection } from "@ui5/webcomponents-react";
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
        <ObjectPage
            headerTitle={
                <DynamicPageTitle 
                    breadcrumbs={
                        <Button icon="nav-back" design={ButtonDesign.Transparent} onClick={setDefaultValues}></Button>
                    }
                >
                </DynamicPageTitle>
            }
            footer={
                <Bar
                    design={BarDesign.FloatingFooter}
                    endContent={
                        <Button onClick={handleSubmit(onSubmit)}>Запази</Button>
                    }
                />
            }
            style={{
                height: "calc(100vh - 3.73rem)"
            }}
        >
            <ObjectPageSection
                aria-label="Информация за служителя"
                id="employee-data"
                titleText="Информация за служителя"
            >
                <Form>
                    <CreateEmployeeForm
                        control={control}
                        formState={formState}
                    />
                </Form>
            </ObjectPageSection>

            <ObjectPageSection
                aria-label="Лични данни"
                id="personal-data"
                titleText="Лични данни"
            >
                <Form>
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
                </Form>
            </ObjectPageSection>


            <ObjectPageSection
                aria-label="Осигуровки"
                id="insurance"
                titleText="Осигуровки"
            >
                <Form>
                    <CreateInsuranceForm
                        control={control}
                        formState={formState}
                        setValue={setValue}
                        getValues={getValues}
                    />
                </Form>
            </ObjectPageSection>


            <ObjectPageSection
                aria-label="Договор"
                id="contract"
                titleText="Договор"
            >
                <Form>
                    <CreateContractForm
                        control={control}
                        formState={formState}
                    />
                </Form>
            </ObjectPageSection>
        </ObjectPage>
    )
}

export default EmployeeEndColumn;