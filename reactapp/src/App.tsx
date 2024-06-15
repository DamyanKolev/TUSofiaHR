// import './App.css'
import { FC, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';
import { ContractPage, DepartmentPage, EmployeePage, Home, EndMonthPage, Login, PositionPage, References, Settings } from './pages/PagesBundle';
import { useValidateAccessToken } from './utils/hooks';
import { useAppSelector } from './store/storeHooks';
import { getRequest } from './utils/requests';
import InitWizardDialog from './components/Dialogs/InitWizardDialog';
import { createPortal } from 'react-dom';
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "./assets/Assets"

const App: FC = () => {
    const location = useLocation();
    const validateAccessToken = useValidateAccessToken()
    const [isInit, setIsInit] = useState<boolean>(false)
    const isLoggedIn = useAppSelector((state) => state.isLoggedIn.value)

    
    const isInizializateApp = async () => {
        try {
            if (isLoggedIn) {
                if (!isInit && location.pathname != "/login") {
                    const result = await getRequest<boolean>("/api/hr/is-init")
                    setIsInit(!result)
                }
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        isInizializateApp()
        validateAccessToken
    }, [location]);

    return (
        <Suspense fallback={<div>Зареждане...</div>}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="employee" element={<EmployeePage />} />
                    <Route path="contract" element={<ContractPage />} />
                    <Route path="position" element={<PositionPage />} />
                    <Route path="department" element={<DepartmentPage />} />
                    <Route path="references" element={<References />} />
                    <Route path="end-month" element={<EndMonthPage />} />
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