import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContractPage, DepartmentPage, EmployeePage, Home, Login, PositionPage } from './pages/PagesBundle'
import { Provider } from 'react-redux'
import { store } from './store/store'


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="employee" element={<EmployeePage />} />
                        <Route path="contract" element={<ContractPage />} />
                        <Route path="position" element={<PositionPage />} />
                        <Route path="department" element={<DepartmentPage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App