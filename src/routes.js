import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import DashboardSaleLayout from 'src/components/DashboardSaleLayout';
//import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
// import CustomerList from 'src/pages/CustomerList';
import Employee from 'src/pages/Employee';
import Medicalrep from 'src/pages/Medicalrep';
import Forum from 'src/pages/Forum';
import Product from 'src/pages/Product';
import Leavetypes from './components/settings/Leavetypes';
import Visittypes from './components/settings/Visittypes';
import Expensetypes from './components/settings/Expensetypes';
//import CustomerList from 'src/pages/CustomerList';
import DataPlanList from 'src/pages/DataPlanList';
import SummaryReportList from 'src/pages/SummaryReportList';
import LeaveList from 'src/pages/LeaveList';
import Dashboard from 'src/pages/Dashboard';
import Dashboardsale from 'src/pages/Dashboardsale';
import Add_Employee from 'src/pages/Add_Employee';
import Add_product from 'src/pages/Add_product';
import AsignTask from 'src/pages/AsignTask';
import ViewSummary from 'src/pages/ViewSummary';
// import Add_product from 'src/pages/Add_product';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
// import ProductList from 'src/pages/ProductList';
// import Register from 'src/pages/Register';
import TaskInfo from 'src/pages/TaskInfo';
import UpdateTask from 'src/pages/UpdateTask';
import SummaryInfo from 'src/pages/SummaryInfo';
import SummaryComment from 'src/pages/SummaryComment';
import LeaveInfo from 'src/pages/LeaveInfo';
import LeaveComment from 'src/pages/LeaveComment';
import Settings from 'src/pages/Settings';
import Help from 'src/pages/Help';
import Add_Medicalrep from 'src/pages/Add_Medicalrep';
import Add_Leavetype from 'src/pages/Add_Leavetype';
import Add_Expensetype from './pages/Add_Expensetype';
import Add_Visittype from './pages/Add_Visittype';
// import Popup from 'src/pages/Popup';
// import CustomerAdd from 'src/pages/customeradd';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'Employee', element: <Employee /> },
      { path: 'Help', element: <Help /> },
      { path: 'dashboard', element: <Dashboard /> },
      // { path: 'dashboardsale', element: <Dashboardsale /> },
      { path: 'Add_Employee', element: <Add_Employee /> },
      { path: 'Add_Product', element: <Add_product /> },
      { path: 'Add_Medicalrep', element: <Add_Medicalrep /> },
      { path: 'Product', element: <Product /> },
      { path: 'Add_Leavetype', element: <Add_Leavetype /> },
      { path: 'Add_Expensetype', element: <Add_Expensetype /> },
      { path: 'Add_Visittype', element: <Add_Visittype /> },
      { path: 'Leavetypes', element: <Leavetypes /> },
      { path: 'Medicalrep', element: <Medicalrep /> },
      { path: 'Visittypes', element: <Visittypes /> },
      { path: 'Expensetypes', element: <Expensetypes /> },
      { path: 'settings', element: <Settings /> },
      { path: 'Forum', element: <Forum /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'appp',
    element: <DashboardSaleLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'dataplan', element: <DataPlanList /> },
      { path: 'SummaryReport', element: <SummaryReportList /> },
      { path: 'Leave', element: <LeaveList /> },
      // { path: 'dashboard', element: <Dashboard /> },
      { path: 'dashboardsale', element: <Dashboardsale /> },
      { path: 'AsignTask', element: <AsignTask /> },
      { path: 'ViewSummary', element: <ViewSummary /> },
      { path: 'TaskInfo/:tasK_id', element: <TaskInfo /> },
      { path: 'UpdateTask/:tasK_id', element: <UpdateTask /> },
      { path: 'SummaryInfo/:report_id', element: <SummaryInfo /> },
      { path: 'SummaryComment/:report_id', element: <SummaryComment /> },
      { path: 'LeaveInfo/:leave_ID', element: <LeaveInfo /> },
      { path: 'LeaveComment/:leave_ID', element: <LeaveComment /> },
      // { path: 'Add_product', element: <Add_product /> },
      // { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <Login />,
    children: [
      //{ path: 'login', element: <Login /> },
      //{ path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '', element: <Navigate to="/app/dashboardSaleLayout" /> },
      { path: '', element: <Navigate to="/appp/dashboardLayout" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  
];



export default routes;
