// import './App.css'
import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import { Article62, ContractPage, DepartmentPage, EmployeePage, EmployeeReports, Home, Login, PositionPage, References, SchedulePage, Settings } from './pages/PagesBundle';
import setSelectedTheme from '@utils/themesUtils';

const App: FC = () => {
    
    useEffect(() => {
        setSelectedTheme();
    }, []);

    return (
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
        </Routes>
    );
}

export default App;