import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { Button, FCLLayout, ObjectPage, ObjectPageSection, DynamicPageHeader, DynamicPageTitle, FlexBox, Link, Label, TitleLevel, Title, ButtonDesign } from '@ui5/webcomponents-react';
import { EmployeeView } from '@pages/Employees/models/EmployeeView';
import { TableRowState } from '@app-types/TableRowState';
import { useAppDispatch } from '@store/storeHooks';
import { setContract } from '@store/slices/contractSlice';
import { EndColumnEnum } from '@pages/Employees/models/EndColumnEnum';
import { ContractPageContext } from '@pages/Contracts/ContractPage';
import { WorkDataView } from '@/pages/Employees/models/WorkDataView';
import { getUpdateData } from '@/utils/requests';
import ContractSmartTable from '../ContractSmartTable';
import contractColumns from '../../models/Columns/ContractColumns';






interface Props {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    layout: FCLLayout
    setEndColumnOption: Dispatch<SetStateAction<EndColumnEnum>>
    tableURL: string
}


const ContractMidColumn: FC<Props> = ({ layout, setLayout, setEndColumnOption, tableURL }) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(ContractPageContext)
    const [workData, setWorkData] = useState<WorkDataView | undefined>(undefined)
    const appDispatch = useAppDispatch()

    const init = async () => {
        try {
            if(rowState) {
                const data = await getUpdateData<WorkDataView, number>(rowState.selectedRow.employeeId, `${tableURL}/work-data`)
                setWorkData(data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const setDefaultValues = () => {
        setLayout(FCLLayout.OneColumn)
        rowState?.setSelectedRow({} as EmployeeView)
    }

    const onClickContract = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.ThreeColumnsMidExpanded)
        setEndColumnOption(EndColumnEnum.UpdateContract)
        appDispatch(setContract(row))
    }

    const onClickFullscreen = () => {
        if (layout === FCLLayout.TwoColumnsMidExpanded) {
            setLayout(FCLLayout.MidColumnFullScreen)
        }
        else {
            setLayout(FCLLayout.TwoColumnsMidExpanded)
        }
    }


    const onCLickCreateContract = () => {
        setLayout(FCLLayout.ThreeColumnsMidExpanded)
        setEndColumnOption(EndColumnEnum.InsertContract)
    }

 
    useEffect(() => {
        if(rowState && Object.keys(rowState.selectedRow).length > 0) {
            init()
        }
    }, [rowState]);


    return (
        <ObjectPage
            headerContent={
                <DynamicPageHeader>
                    <FlexBox alignItems="Center" wrap="Wrap">
                        <FlexBox direction="Column">
                            <Link>{workData?.phoneNumber}</Link>
                            <Link href={`mailto:${workData?.workEmail}`}>{workData?.workEmail}</Link>
                        </FlexBox>
                    <FlexBox direction="Column" style={{padding: '10px'}}>
                    <Label>{workData?.employeeName}</Label>
                    <Label>{`${workData?.populatedPlace}, България`}</Label>
                    </FlexBox></FlexBox>
                </DynamicPageHeader>
            }
            headerContentPinnable
            headerTitle={
                <DynamicPageTitle 
                    actions={
                        <>
                            <Button 
                                icon={layout == FCLLayout.TwoColumnsMidExpanded ? "full-screen" : "exit-full-screen"}
                                onClick={onClickFullscreen}
                                design={ButtonDesign.Transparent}
                            />
                        </>
                    } 
                    header={workData?.employeeName} 
                    showSubHeaderRight 
                    subHeader={workData?.positionName}
                    breadcrumbs={
                        <Button design={ButtonDesign.Transparent} icon="nav-back" onClick={setDefaultValues}></Button>
                    }
                >
                    {/* <ObjectStatus state="Success">Назначен</ObjectStatus> */}
                </DynamicPageTitle>
            }
            // image="https://sap.github.io/ui5-webcomponents-react/assets/Person-B7wHqdJw.png"
            imageShapeCircle
            showHideHeaderButton
            style={{
                height: "calc(100vh - 3.73rem)"
            }}
        >

            {
                rowState?.selectedRow !== undefined && Object.keys(rowState.selectedRow).length > 0 &&
                <ObjectPageSection
                    header={
                        <Title level={TitleLevel.H4}>ДОГОВОРИ</Title>
                    }
                    aria-label="Договори"
                    id="contract"
                    titleText="Договори"
                    titleTextLevel={TitleLevel.H1}
                >
                    <ContractSmartTable
                        employeeId={rowState?.selectedRow.employeeId}
                        columns={contractColumns}
                        onRowClick={onClickContract}
                        onCreateClick={onCLickCreateContract}
                    />
                </ObjectPageSection>
            }
        </ObjectPage>
    );
};

export default ContractMidColumn;