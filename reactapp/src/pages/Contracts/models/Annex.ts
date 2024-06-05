import { Optional } from "@/types/Optional";

export interface AnnexInsertDTO {
    workingWage: Optional<string>;
    workTime: Optional<int>;
    annualLeave: Optional<int>;
    additionalClause: Optional<string>,
    conclusionDate: string
    executionDate: string;
    contractTerm: Optional<string>;
    additionalAgreementDate: string;
    contractTypeId: int;
    sysPositionId: Optional<int>;
    sysIconomicActivityId: Optional<int>;
    documentTypeId: int;
    companyEic: string,
    contractId: Optional<int>,
    sysAdministrativeTerritoryId: Optional<int>;
    codeCorection: int;
    isAnnex: boolean,
    article62Flag: boolean,
}

export const defaultAnnexInsert: AnnexInsertDTO = {
    workingWage: "",
    workTime: null,
    annualLeave: null,
    additionalClause: null,
    conclusionDate: "",
    executionDate: "",
    contractTerm: null,
    additionalAgreementDate: "",
    contractTypeId: 17,
    sysPositionId: null,
    sysIconomicActivityId: null,
    documentTypeId: 3,
    companyEic: "",
    contractId: null,
    sysAdministrativeTerritoryId: 1,
    codeCorection: 0,
    isAnnex: true,
    article62Flag: false,
}