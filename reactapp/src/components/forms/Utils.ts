import DataType from "@app-types/DataType";


export function formatDate(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const day: string = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function parseValueByType<Type>(
    object: Type,
    fieldName: string,
    value: string,
    type: string
): Type {
    switch (type) {
        case DataType.Number:
            {
                return { ...object, [fieldName]: Number.parseInt(value) }
            }
        case DataType.Float:
            {
                return { ...object, [fieldName]: Number.parseFloat(value) }
            }
        case DataType.String:
            {
                return { ...object, [fieldName]: value };
            }
        case DataType.Date:
            {
                const date = new Date(value)
                return { ...object, [fieldName]: formatDate(date) };
            }
        default:
            {
                throw new Error("Invalid Type");
            }
    }
}