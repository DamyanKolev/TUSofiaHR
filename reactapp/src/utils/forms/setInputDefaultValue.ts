


export function setInputDefaultValue(value: number | string | null): string {
    if (value == null) {
        return ""
    }
    else {
        if(typeof value == "number"){
            return value.toString()
        }
        else {
            return value
        }
    }
}


export function setDateToInputDefaultValue(value: Date | null): string {
    if (value == null) {
        return ""
    }
    else {
        return value.toString()
    }
}
