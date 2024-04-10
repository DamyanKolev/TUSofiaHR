import FilterType from "@app-types/enums/FilterTypes";

export function setFilterValueByFilterType(value: string, filterType: FilterType): string | null {
    switch (filterType) {
        case FilterType.Equal: {
            return `=${value}`
        }
        case FilterType.NotEqual: {
            return `!(=${value})`
        }
        case FilterType.Between: {
            const values = value.split(",")
            return `${values[0]}...${values[1]}`
        }
        case FilterType.NotBetween: {
            const values = value.split(",")
            return `!(${values[0]}...${values[1]})`
        }
        case FilterType.GreaterThan: {
            return `>${value}`
        }
        case FilterType.GreaterThanOrEqual: {
            return `!(>${value})`
        }
        case FilterType.LessThan: {
            return `<${value}`
        }
        case FilterType.LessThanOrEqual: {
            return `!(<${value})`
        }
        case FilterType.Contains: {
            return `*${value}*`
        }
        case FilterType.NotContains: {
            return `!(*${value}*)`
        }
        case FilterType.StartsWith: {
            return `${value}*`
        }
        case FilterType.NotStartsWith: {
            return `!(${value}*)`
        }
        case FilterType.EndsWith: {
            return `*${value}`
        }
        case FilterType.NotEndsWith: {
            return `!(*${value})`
        }
        default: {
            return null
        }
    }
}