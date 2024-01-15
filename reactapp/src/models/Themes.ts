export interface Theme {
    themeName: string,
    displayName: string,
}


export const themes: Array<Theme> = [
    {
        themeName: "sap_horizon",
        displayName: "Morning Horizon"
    },
    {
        themeName: "sap_horizon_dark",
        displayName: "Evening Horizon Dark"
    },
    {
        themeName: "sap_horizon_hcb",
        displayName: "Horizon High Contrast Black"
    },
    {
        themeName: "sap_horizon_hcw",
        displayName: "Horizon High Contrast White"
    },
    {
        themeName: "sap_fiori_3",
        displayName: "Quartz Light"
    },
    {
        themeName: "sap_fiori_dark",
        displayName: "Quartz Dark"
    },
    {
        themeName: "sap_belize",
        displayName: "Belize"
    },
    {
        themeName: "sap_belize_hcb",
        displayName: "Belize High Contrast Black"
    },
    {
        themeName: "sap_belize_hcw",
        displayName: "Belize High Contrast White"
    }
]