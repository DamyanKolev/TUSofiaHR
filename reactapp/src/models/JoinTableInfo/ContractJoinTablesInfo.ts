import { JoinTableInfo } from "./JoinTableInfo";

export type ContractJoinTablesInfo = {
    contractTypeId: JoinTableInfo;
    positionId: JoinTableInfo;
    iconomicActivityId: JoinTableInfo;
    documentTypeId: JoinTableInfo;
    administrativeTerritoryId: JoinTableInfo;
}


export const contractJoinTablesInfo: ContractJoinTablesInfo = {
    contractTypeId: {
        filterField: "code",
        contentField: "contractType",
        headerText: "��� �������",
        tableURL: "/api/sys/contract-type/all"
    },
    positionId: {
        filterField: "npkdId",
        contentField: "positionName",
        headerText: "�������",
        tableURL: "/api/sys/positions/page"
    },
    iconomicActivityId: {
        filterField: "nkidId",
        contentField: "activityName",
        headerText: "������������ �������",
        tableURL: "/api/sys/iconomic-activity/page"
    },
    documentTypeId: {
        filterField: "code",
        contentField: "documentType",
        headerText: "��������",
        tableURL: "/api/sys/document-type/all"
    },
    administrativeTerritoryId: {
        filterField: "ekatte",
        contentField: "territoryName",
        headerText: "��������������� ���������",
        tableURL: "/api/sys/administrative-territory/page"
    },
}