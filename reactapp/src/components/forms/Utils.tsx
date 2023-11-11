

export function formatDate(date: Date) : String {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function setDefaultValues(valueType: String) : any{
    if (valueType.toLowerCase() === "number") {
        return 0
    }
    else if (valueType.toLowerCase() === "date") {
        const date = new Date("1970-01-01T00:00:00Z")
        return formatDate(date)
    }
    else if (valueType.toLowerCase() === "bool") {
        return false
    }
    else {
        return "none"
    }
}

export async function getObjectFromFormData(form: HTMLFormElement, defaultStructs = [""]): Promise<Object> {
    const formData = new FormData(form)
    let data = {};

    for (let [fieldName, fieldValue] of formData.entries()) {
        const objectsField = fieldName.split(".")
        const element = form.querySelector(`[name="${fieldName}"]`) as any
        const structName = fieldName.split(".")[0]
        if (element != null) {
            const valueType = element.hasAttribute("data-type") ? element.dataset.type : element.type
            let currentValue: any = fieldValue;


            if (defaultStructs.includes(structName)) {
                if (element.hasAttribute("required")) {
                    currentValue = setDefaultValues(currentValue)
                }
                else {
                    currentValue = null
                }
            }
            else {
                if (element.tagName.toLowerCase() === "ui5-select") {
                    fieldValue = element.selectedOption.textContent
                }

                if (valueType.toLowerCase() === "number") {
                    currentValue = Number(currentValue)
                }
                else if (valueType.toLowerCase() === "bool") {
                    currentValue = currentValue.toLowerCase() === "true" ? true : false
                }
            }

            objectsField.reduce((obj, str, index) => {
                if (index === objectsField.length - 1) {
                    obj[str] = fieldValue;
                }
                else {
                    if (!(str in obj)) {
                        obj[str] = {};
                    }
                    return obj[str];
                }
                return obj;
            }, data);
        }
    }

    return data;
}