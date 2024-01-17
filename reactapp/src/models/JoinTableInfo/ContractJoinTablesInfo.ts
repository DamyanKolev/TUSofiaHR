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
        contentFields: ["contract_type"],
        headerText: "Тип Договор",
        tableURL: "/api/sys/contract-type/all"
    },
    positionId: {
        filterField: "npkd_id",
        description: "npkd_id",
        contentFields: ["position_name"],
        headerText: "Позиция",
        tableURL: "/api/sys/positions/page"
    },
    iconomicActivityId: {
        filterField: "nkid_id",
        description: "nkid_id",
        contentFields: ["activity_name"],
        headerText: "Икономическа активност",
        tableURL: "/api/sys/iconomic-activity/page"
    },
    documentTypeId: {
        filterField: "code",
        description: "code",
        contentFields: ["document_type"],
        headerText: "Документ",
        tableURL: "/api/sys/document-type/all"
    },
    administrativeTerritoryId: {
        filterField: "ekatte",
        description: "ekatte",
        contentFields: ["territory_name"],
        headerText: "Административна територия",
        tableURL: "/api/sys/administrative-territory/page"
    },
    terminationTypeId: {
        filterField: "code",
        description: "code",
        contentFields: ["termination_type"],
        headerText: "Тип терминиране",
        tableURL: "/api/sys/termination-type/all"
    },
}