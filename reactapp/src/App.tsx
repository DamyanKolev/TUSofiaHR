// import './App.css'
import { FC, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';
import { Article62, ContractPage, DeclarationPage, DepartmentPage, EmployeePage, EmployeeReports, Home, InsurancePage, Login, PositionPage, References, Settings } from './pages/PagesBundle';
import setSelectedTheme from '@utils/themesUtils';
import { useValidateAccessToken } from './utils/hooks';
import { useAppSelector } from './store/storeHooks';
import { getData } from './utils/getData';
import InitWizardDialog from './components/Dialogs/InitWizardDialog';
import { createPortal } from 'react-dom';

const App: FC = () => {
    const location = useLocation();
    const validateAccessToken = useValidateAccessToken()
    const [isInit, setIsInit] = useState<boolean>(false)
    const isLoggedIn = useAppSelector((state) => state.isLoggedIn.value)

    
    const isInizializateApp = async () => {
        if (isLoggedIn) {
            if (!isInit && location.pathname != "/login") {
                const result = await getData<boolean>("/api/hr/is-init")
                if (result != null) {
                    setIsInit(!result)
                }
            }
        }
    }
    
    useEffect(() => {
        isInizializateApp()
        setSelectedTheme();
        validateAccessToken
    }, [location]);

    return (
        <Suspense fallback={<div>Зареждане...</div>}>
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

            {
                isInit &&
                createPortal(
                    <InitWizardDialog
                        open={isInit}
                    />, 
                    document.body
                )
            }
        </Suspense>
    );
}

export default App;