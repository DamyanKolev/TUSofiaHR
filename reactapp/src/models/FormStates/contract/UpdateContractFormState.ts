import { ContractView } from "@/models/TableViews/ContractView";
import { FormFieldState, FormState, defaultFormFieldState } from "../FormState"
import { setNullValuesToEmtyString } from "@/utils/forms/setNullValuesToEmtyString";
import { ValueState } from "@ui5/webcomponents-react";

export interface UpdateContractFormState extends FormState{
    workingWage: FormFieldState;
    workTime: FormFieldState;
    annualLeave: FormFieldState;
    conclusionDate: FormFieldState;
    executionDate: FormFieldState;
    contractTerm: FormFieldState;
    additionalAgreementDate: FormFieldState;
    terminationDate: FormFieldState,
    changeDate: FormFieldState,
    companyId: FormFieldState;
    contractTypeId: FormFieldState;
    positionId: FormFieldState;
    iconomicActivityId: FormFieldState;
    documentTypeId: FormFieldState;
    administrativeTerritoryId: FormFieldState;
    terminationTypeId: FormFieldState
    codeCorection: FormFieldState;
    article62Flag: FormFieldState,
}

const defaultUpdateFormState: FormFieldState = {
    isFilled: true,
    valueState: ValueState.None
}

export const defaultUpdateContractFormState: UpdateContractFormState = {
    workingWage: defaultFormFieldState,
    workTime: defaultFormFieldState,
    annualLeave: defaultFormFieldState,
    conclusionDate: defaultFormFieldState,
    executionDate: defaultFormFieldState,
    contractTerm: defaultFormFieldState,
    additionalAgreementDate: defaultFormFieldState,
    terminationDate: defaultFormFieldState,
    changeDate: defaultFormFieldState,
    companyId: defaultFormFieldState,
    contractTypeId: defaultFormFieldState,
    positionId: defaultFormFieldState,
    iconomicActivityId: defaultFormFieldState,
    documentTypeId: defaultFormFieldState,
    administrativeTerritoryId: defaultFormFieldState,
    terminationTypeId: defaultFormFieldState,
    codeCorection: defaultFormFieldState,
    article62Flag: defaultFormFieldState,
}



export interface ContractUpdateFormData {
    contractTypeId: string,
    positionId: string,
    iconomicActivityId: string,
    documentTypeId: string,
    terminationTypeId: string,
    administrativeTerritoryId: string,
}

export function createContractUpdateFormData(contract: ContractView): ContractUpdateFormData {
    const data = setNullValuesToEmtyString<ContractView>(contract)
    return {
        contractTypeId: data.contractType,
        positionId: data.positionName,
        iconomicActivityId: data.activityName,
        documentTypeId: data.documentType,
        terminationTypeId: data.documentType,
        administrativeTerritoryId: data.ekatte,
    }
}