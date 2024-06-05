import { JoinTableInfo } from "@/models/JoinTableInfo/JoinTableInfo";


export const insuranceJoinTableInfo:JoinTableInfo = {
    filterField: "code",
    description: "code",
    contentFields: ["insuranceType"],
    headerText: "Вид осигурен",
    tableURL: "/api/sys/insurance-type/all"
}