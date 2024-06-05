import { FC } from 'react';
import { 
    Bar, BarDesign, Button, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, ButtonDesign, FlexBox,
    ButtonType
} from "@ui5/webcomponents-react";
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import CreateEmployeeForm from '@/pages/Employees/components/Forms/employee/CreateEmployeeForm';
import { submitPostForm } from '@utils/forms/submitForm';
import { formToggle } from '@store/slices/formToggleSlice';
import CreateInsuranceForm from '@/pages/Employees/components/Forms/insurance/CreateInsuranceForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmployeeDataInsertSchema } from '../../models/schemes/EmployeeDataSchema';
import CreatePersonalDataForm from '../Forms/personalData/CreatePersonalDataForm';
import CreateAddressForm from '../Forms/address/CreateAddressForm';
import CreateContractForm from '../Forms/contract/CreateContractForm';
import { defaultEmployeeDataInsert, EmployeeDataInsert } from '../../models/EmployeeData';



interface EmployeeEndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EmployeeEndColumn: FC<EmployeeEndColumnProps> = ({handleLayoutState, tableURL}) => {
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
        handleLayoutState(FCLLayout.OneColumn)
        dispatchIsSuccess(formToggle())
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <ObjectPage
                footer={
                    <Bar design={BarDesign.FloatingFooter}>
                        <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                        <Button slot="endContent" design={ButtonDesign.Emphasized} type={ButtonType.Submit}>Запази</Button>
                    </Bar>
                }
                headerContent={
                    <Bar design={BarDesign.Subheader} 
                        startContent={<Button design="Transparent" icon="nav-back" onClick={navBackClick}/>}
                    />
                }
                style={{
                    height: 'calc(100vh - 3.73rem)'
                }}
                >
                <ObjectPageSection
                    id="employee"
                    titleText="Служител"
                >
                    <ObjectPageSubSection
                        hideTitleText
                        titleText="Служител"
                        id="employee-info"
                    >
                        <CreateEmployeeForm
                            control={control}
                            formState={formState}
                        />
                    </ObjectPageSubSection>

                </ObjectPageSection>



                <ObjectPageSection
                    id="personal"
                    titleText="Лична данни"
                >
                    <ObjectPageSubSection
                        hideTitleText
                        titleText="Лична данни"
                        id="personal-data-info"
                    >
                        <FlexBox style={{gap:"4rem", padding:".3rem 2rem"}}>
                            <CreatePersonalDataForm
                                control={control}
                                formState={formState}
                            />
                            <CreateAddressForm
                                control={control}
                                formState={formState}
                            />
                        </FlexBox>
                    </ObjectPageSubSection>

                </ObjectPageSection>


                <ObjectPageSection
                    id="contract"
                    titleText="Договор"
                >
                    <ObjectPageSubSection
                        hideTitleText
                        titleText="Договор"
                        id="contract-info"
                    >
                        <CreateContractForm
                            control={control}
                            formState={formState}
                        />
                    </ObjectPageSubSection>
                </ObjectPageSection>



                <ObjectPageSection
                    id="insurance"
                    titleText={getValues("contract.sysIconomicActivityId") != 0? "Осигуровки" : ""}
                >
                    {
                        getValues("contract.sysIconomicActivityId") != 0 &&
                        <ObjectPageSubSection
                            hideTitleText
                            titleText="Осигуровки"
                            id="insurance-info"
                        >
                            <CreateInsuranceForm
                                control={control}
                                formState={formState}
                                setValue={setValue}
                                getValues={getValues}
                            />
                        </ObjectPageSubSection>
                    }
                </ObjectPageSection>
            </ObjectPage>
        </form>
    )
}

export default EmployeeEndColumn;