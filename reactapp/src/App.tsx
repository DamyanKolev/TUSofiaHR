// import './App.css'
import { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';
import { Article62, ContractPage, DeclarationPage, DepartmentPage, EmployeePage, EmployeeReports, Home, InsurancePage, Login, PositionPage, References, Settings } from './pages/PagesBundle';
import setSelectedTheme from '@utils/themesUtils';
import { useValidateAccessToken } from './utils/hooks';

const App: FC = () => {
    const location = useLocation();
    const validateAccessToken = useValidateAccessToken()
    
    useEffect(() => {
        setSelectedTheme();
        validateAccessToken
    }, [location]);

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
                <Route path="hr/insurance" element={<InsurancePage />} />
                <Route path="hr/references/article62" element={<Article62 />} />
                <Route path="hr/references/declaration" element={<DeclarationPage />} />
            </Route>
                 <Route path="login" element={<Login />} />
        </Routes>
    );
}

export default App;