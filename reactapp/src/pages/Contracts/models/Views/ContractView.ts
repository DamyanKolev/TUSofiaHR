export interface ContractView {
    contractId: int,
    employeeId: int,
    employeeName: string,
    conclusionDate: Date;
    executionDate: Date;
    contractTerm: Date;
    additionalAgreementDate: Date;
    terminationDate: Date;
    positionName: string;
    activityName: string;
    contractType: string;
    codeCorection: int;
    documentType: string;
    ekatte: string;
    nkpd: string;
    nkid: string;
    contractTypeCode: string;
    terminationCode: string;
    isTerminate: boolean,
    article62Flag: boolean;
}