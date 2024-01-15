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
        headerText: "Тип Договор",
        tableURL: "/api/sys/contract-type/all"
    },
    positionId: {
        filterField: "npkdId",
        contentField: "positionName",
        headerText: "Позиция",
        tableURL: "/api/sys/positions/page"
    },
    iconomicActivityId: {
        filterField: "nkidId",
        contentField: "activityName",
        headerText: "Икономическа дейност",
        tableURL: "/api/sys/iconomic-activity/page"
    },
    documentTypeId: {
        filterField: "code",
        contentField: "documentType",
        headerText: "Документ",
        tableURL: "/api/sys/document-type/all"
    },
    administrativeTerritoryId: {
        filterField: "ekatte",
        contentField: "territoryName",
        headerText: "Административна територия",
        tableURL: "/api/sys/administrative-territory/page"
    },
}