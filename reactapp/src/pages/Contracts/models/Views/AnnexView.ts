import { Optional } from "@app-types/Optional";

export interface AnnexView {
    contractId: int,
    conclusionDate: Date,
    executionDate: Date,
    contractTerm: Optional<Date>,
    additionalAgreementDate: Optional<Date>,
    terminationDate: Optional<Date>,
    positionName: Optional<string>,
    activityName: Optional<string>,
    contractType: string,
    documentType: string,
    ekatte: Optional<string>,
    nkpd: Optional<string>,
    nkid: Optional<string>,
    insuranceTypeCode: Optional<string>,
    contractTypeCode: string,
    terminationCode: Optional<string>,
    isTerminate: boolean,
    article62Flag: boolean,
}