import { AnnexView } from "./AnnexView";

export interface ContractView {
    contractId: int,
    employeeId: int,
    conclusionDate: Date;
    executionDate: Date;
    contractTerm: Date;
    ekatte: string;
    nkpd: string;
    nkid: string;
    contractTypeCode: string;
    terminationCode: string;
    isTerminate: boolean,
    article62Flag: boolean;
    annexes: Array<AnnexView>
}