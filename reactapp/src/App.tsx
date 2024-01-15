// import './App.css'
import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './layouts/Layout';
import { Article62, ContractPage, DepartmentPage, InitPage, EmployeePage, EmployeeReports, Home, Login, PositionPage, SchedulePage, Settings } from './pages/PagesBundle';
import References from './pages/references/References';
import setSelectedTheme from '@utils/themesUtils';

const App: FC = () => {
    
    useEffect(() => {
        setSelectedTheme();
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="hr" element={<EmployeeReports />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="hr/employee" element={<EmployeePage />} />
                        <Route path="hr/contract" element={<ContractPage />} />
                        <Route path="hr/position" element={<PositionPage />} />
                        <Route path="hr/department" element={<DepartmentPage />} />
                        <Route path="hr/references" element={<References />} />
                        <Route path="hr/schedule" element={<SchedulePage />} />
                        <Route path="hr/references/article62" element={<Article62 />} />
                    </Route>
                    <Route path="auth/login" element={<Login />} />
                    <Route path="init" element={<InitPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;