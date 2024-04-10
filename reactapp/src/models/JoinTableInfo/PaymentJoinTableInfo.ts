import { JoinTableInfo } from "./JoinTableInfo";

export const paymentTypeJoinTable:JoinTableInfo = {
    filterField: "code",
    description: "code",
    contentFields: ["paymentType"],
    headerText: "Вид плащане",
    tableURL: "/api/sys/payment-type/all"
}