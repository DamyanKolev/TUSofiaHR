import { parseDateToRFC2822 } from "../parsers"



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


export function setDateToInputDefaultValue(date: Date | null): string {
    if (date) {
        return parseDateToRFC2822(date)
    }
    else return ""
}
