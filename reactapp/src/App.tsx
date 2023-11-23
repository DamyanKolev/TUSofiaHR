import './App.css'
import Layout from './Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Employee from './pages/hr/Employee'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Contract from './pages/hr/Contract'



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="employee" element={<Employee />} />
                    <Route path="contract" element={<Contract />} />
                </Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App