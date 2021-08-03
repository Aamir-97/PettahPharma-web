import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import DashboardSaleLayout from 'src/components/DashboardSaleLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import DataPlanList from 'src/pages/DataPlanList';
import SummaryReportList from 'src/pages/SummaryReportList';
import LeaveList from 'src/pages/LeaveList';
import Dashboard from 'src/pages/Dashboard';
import Dashboardsale from 'src/pages/Dashboardsale';
import Add_Employee from 'src/pages/Add_Employee';
import AsignTask from 'src/pages/AsignTask';
import ViewSummary from 'src/pages/ViewSummary';
import Add_product from 'src/pages/Add_product';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
// import Popup from 'src/pages/Popup';
// import CustomerAdd from 'src/pages/customeradd';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      // { path: 'dashboardsale', element: <Dashboardsale /> },
      { path: 'Add_Employee', element: <Add_Employee /> },
      { path: 'Add_product', element: <Add_product /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
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
