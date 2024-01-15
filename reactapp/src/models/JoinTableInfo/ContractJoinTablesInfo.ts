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
        tableURL: "/backend/api/sys/contract-type/all"
    },
    positionId: {
        filterField: "npkd_id",
        description: "npkd_id",
        contentFields: ["position_name"],
        headerText: "Позиция",
        tableURL: "/backend/api/sys/positions/page"
    },
    iconomicActivityId: {
        filterField: "nkid_id",
        description: "nkid_id",
        contentFields: ["activity_name"],
        headerText: "Икономическа активност",
        tableURL: "/backend/api/sys/iconomic-activity/page"
    },
    documentTypeId: {
        filterField: "code",
        description: "code",
        contentFields: ["document_type"],
        headerText: "Документ",
        tableURL: "/backend/api/sys/document-type/all"
    },
    administrativeTerritoryId: {
        filterField: "ekatte",
        description: "ekatte",
        contentFields: ["territory_name"],
        headerText: "Административна територия",
        tableURL: "/backend/api/sys/administrative-territory/page"
    },
    terminationTypeId: {
        filterField: "code",
        description: "code",
        contentFields: ["termination_type"],
        headerText: "Тип терминиране",
        tableURL: "/backend/api/sys/termination-type/all"
    },
}