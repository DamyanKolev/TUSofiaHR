import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContractPage, EmployeePage, Home, Login, PositionPage } from './pages/PagesBundle'



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="employee" element={<EmployeePage />} />
                    <Route path="contract" element={<ContractPage />} />
                    <Route path="position" element={<PositionPage />} />
                </Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App