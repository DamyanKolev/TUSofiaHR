import { ThemeProvider } from '@ui5/webcomponents-react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import './index.css'

import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
setTheme("sap_horizon");

const root = createRoot(document.getElementById("root")!);
root.render(
    <Provider store={store}>
        <ThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);
