
import { lazy } from 'react'


const Home = lazy(() => import('./Home'));
const EmployeePage = lazy (() => import('./hr/EmployeePage'))
const Login = lazy (() => import('./auth/Login'))
const ContractPage = lazy (() => import('./hr/ContractPage'))
const PositionPage = lazy (() => import('./hr/PositionPage'))
const DepartmentPage = lazy (() => import('./hr/DepartmentPage'))
const Settings = lazy (() => import('./SettingsPage'))
const References = lazy (() => import('./references/References'))
const EndMonthPage = lazy (() => import('./hr/EndMonthPage'))

export {
    EmployeePage, Home, Login, ContractPage, PositionPage, DepartmentPage, Settings, References, 
    EndMonthPage
}