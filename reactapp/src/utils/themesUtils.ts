import { setTheme, getTheme, getDefaultTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

export default function setSelectedTheme() {
    const theme = localStorage.getItem("theme")

    //checks if there is a saved theme 
    if(theme) {
        const currentTheme = getTheme()

        //checks if the current theme is different from the one saved in local storage
        if (currentTheme !== theme) {
            setTheme(theme);
        }
        else {
            setTheme(getDefaultTheme());
        }
    }
}