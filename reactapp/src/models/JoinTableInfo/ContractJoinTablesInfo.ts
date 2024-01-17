import { JoinTableInfo } from "./JoinTableInfo";

export type ContractJoinTablesInfo = {
    contractTypeId: JoinTableInfo;
    positionId: JoinTableInfo;
    iconomicActivityId: JoinTableInfo;
    documentTypeId: JoinTableInfo;
    administrativeTerritoryId: JoinTableInfo;
    terminationTypeId: JoinTableInfo;
}


export const contractJoinTablesInfo: ContractJoinTablesInfo = {
    contractTypeId: {
        filterField: "code",
        description: "code",
        contentFields: ["contractType"],
        headerText: "Тип Договор",
        tableURL: "/api/sys/contract-type/all"
    },
    positionId: {
        filterField: "npkdId",
        description: "npkdId",
        contentFields: ["positionName"],
        headerText: "Позиция",
        tableURL: "/api/sys/positions/page"
    },
    iconomicActivityId: {
        filterField: "nkidId",
        description: "nkidId",
        contentFields: ["activityName"],
        headerText: "Икономическа активност",
        tableURL: "/api/sys/iconomic-activity/page"
    },
    documentTypeId: {
        filterField: "code",
        description: "code",
        contentFields: ["documentType"],
        headerText: "Документ",
        tableURL: "/api/sys/document-type/all"
    },
    administrativeTerritoryId: {
        filterField: "ekatte",
        description: "ekatte",
        contentFields: ["territoryName"],
        headerText: "Административна територия",
        tableURL: "/api/sys/administrative-territory/page"
    },
    terminationTypeId: {
        filterField: "code",
        description: "code",
        contentFields: ["terminationType"],
        headerText: "Тип терминиране",
        tableURL: "/api/sys/termination-types/all"
    },
}