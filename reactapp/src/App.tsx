import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Contract, Employee, Home, Login, Position } from '@components/pages/PagesBundle'



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="employee" element={<Employee />} />
                    <Route path="contract" element={<Contract />} />
                    <Route path="position" element={<Position />} />
                </Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App