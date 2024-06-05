
import { lazy } from 'react'


const Home = lazy(() => import('./Home'));
const EmployeePage = lazy (() => import('./Employees/EmployeePage'))
const Login = lazy (() => import('./auth/Login'))
const ContractPage = lazy (() => import('./Contracts/ContractPage'))
const PositionPage = lazy (() => import('./Positions/PositionPage'))
const DepartmentPage = lazy (() => import('./Departments/DepartmentPage'))
const Settings = lazy (() => import('./SettingsPage'))
const References = lazy (() => import('./references/References'))
const EndMonthPage = lazy (() => import('./EndMonth/EndMonthPage'))

export {
    EmployeePage, Home, Login, ContractPage, PositionPage, DepartmentPage, Settings, References, 
    EndMonthPage
}