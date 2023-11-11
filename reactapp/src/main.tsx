import { ThemeProvider } from '@ui5/webcomponents-react';
import { createRoot } from 'react-dom/client';
import App from './App1.tsx'
import './index.css'

import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_horizon");

const root = createRoot(document.getElementById("app-root"));
root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
