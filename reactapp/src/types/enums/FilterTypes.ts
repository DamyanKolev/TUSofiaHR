enum FilterType {
    Equal = "eq",
    NotEqual = "ne",
    Between = "between",
    NotBetween = "not between",
    GreaterThan = "gt",
    GreaterThanOrEqual = "ge",
    LessThan = "lt",
    LessThanOrEqual = "le",
    Contains = "contains",
    NotContains = "not contains",
    StartsWith = "starts with",
    NotStartsWith = "not starts with",
    EndsWith = "ends with",
    NotEndsWith = "not ends with",
    Null = "null",
}

export default FilterType


export const NUMBER_TYPE_INCLUDE_OPTIONS = ['equal to', 'less than', 'between', 'less than or equal to', 'greater than', 'greater than or equal to']
export const NUMBER_TYPE_EXCLUDE_OPTIONS = ['not equal to', 'not less than', 'not between', 'not less than or equal to', 'not greater than', 'not greater than or equal to']
export const STRING_TYPE_EXCLUDE_OPTIONS = ['not equal to', 'does not contain','not between','does not start with','does not start with']
export const STRING_TYPE_INCLUDE_OPTIONS = ['equal to','contains','between','starts with','ends with']


export const NUMBER_TYPE_INCLUDE_OPTIONS_BG = [
    ["равно на", FilterType.Equal],
    ["по-малко от", FilterType.LessThan],
    ["между", FilterType.Between],
    ["по-малъко или равено на", FilterType.LessThanOrEqual], 
    ["по-голямо от", FilterType.GreaterThan], 
    ["по-голямо или равно на", FilterType.GreaterThanOrEqual]
];
export const NUMBER_TYPE_EXCLUDE_OPTIONS_BG = [
    ["не е равно на", FilterType.NotEqual], 
    ["не е между", FilterType.NotBetween], 
];


export const STRING_TYPE_INCLUDE_OPTIONS_BG = [
    ["равно на", FilterType.Equal],
    ["съдържа", FilterType.Contains], 
    ["между", FilterType.Between], 
    ["започва с", FilterType.StartsWith], 
    ["завършва с", FilterType.EndsWith] 
];
export const STRING_TYPE_EXCLUDE_OPTIONS_BG = [
    ["не е равно на", FilterType.NotEqual], 
    ["не съдържа", FilterType.NotContains],
    ["не е между", FilterType.NotBetween], 
    ["не започва с", FilterType.NotStartsWith], 
    ["не завършва с", FilterType.NotEndsWith],
];