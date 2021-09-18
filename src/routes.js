import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import DashboardSaleLayout from 'src/components/DashboardSaleLayout';
import Account from 'src/pages/Account';
import AdminAccount from 'src/pages/AdminAccount';
import Forum from 'src/pages/Forum';
import GenerateReport from 'src/pages/GenerateReport';
import DataPlanList from 'src/pages/DataPlanList';
import ManagerList from 'src/pages/ManagerList';
import MedicalRepList from 'src/pages/MedicalRepList';
import ProductList from 'src/pages/ProductList';
import SummaryReportList from 'src/pages/SummaryReportList';
import LeaveList from 'src/pages/LeaveList';
import AllownsList from 'src/pages/AllownsList';
import Dashboard from 'src/pages/Dashboard';
import Dashboardsale from 'src/pages/Dashboardsale';
import Add_Salesmanager from 'src/pages/Add_Salesmanager';
import Add_Medicalrep from 'src/pages/Add_Medicalrep';
import Add_Product from 'src/pages/Add_Product';
import Edit_Salesmanager from 'src/pages/Edit_Salesmanager';
import Edit_Medicalrep from 'src/pages/Edit_Medicalrep';
import Edit_Product from 'src/pages/Edit_Product';
import AsignTask from 'src/pages/AsignTask';
import ViewSummary from 'src/pages/ViewSummary';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import TaskInfo from 'src/pages/TaskInfo';
import UpdateTask from 'src/pages/UpdateTask';
import SummaryInfo from 'src/pages/SummaryInfo';
import SummaryComment from 'src/pages/SummaryComment';
import LeaveInfo from 'src/pages/LeaveInfo';
import LeaveComment from 'src/pages/LeaveComment';
import AllownsInfo from 'src/pages/AllownsInfo';
import AllownsComment from 'src/pages/AllownsComment';
import Reports from 'src/pages/Reports';
import Kpi from 'src/pages/Kpi';
import FileUpload from 'src/pages/FileUpload';


const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'AdminAccount', element: <AdminAccount /> },
      { path: 'Reports', element: <Reports /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'ManagerList', element: <ManagerList /> },
      { path: 'MedicalRepList', element: <MedicalRepList /> },
      { path: 'ProductList', element: <ProductList /> },
      { path: 'Add_Salesmanager', element: <Add_Salesmanager /> },
      { path: 'Add_Medicalrep', element: <Add_Medicalrep /> },
      { path: 'Add_Product', element: <Add_Product /> },
      { path: 'Edit_Salesmanager/:manager_ID', element: <Edit_Salesmanager /> },
      { path: 'Edit_Medicalrep/:rep_ID', element: <Edit_Medicalrep /> },
      { path: 'Edit_Product/:product_id', element: <Edit_Product /> },
      { path: 'Forum', element: <Forum /> },
      { path: 'FileUpload', element: <FileUpload /> },
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
      { path: 'Allowns', element: <AllownsList />},
      { path: 'dashboardsale', element: <Dashboardsale /> },
      { path: 'AsignTask', element: <AsignTask /> },
      { path: 'ViewSummary', element: <ViewSummary /> },
      { path: 'TaskInfo/:tasK_id', element: <TaskInfo /> },
      { path: 'UpdateTask/:tasK_id', element: <UpdateTask /> },
      { path: 'SummaryInfo/:report_id', element: <SummaryInfo /> },
      { path: 'SummaryComment/:report_id', element: <SummaryComment /> },
      { path: 'LeaveInfo/:leave_ID', element: <LeaveInfo /> },
      { path: 'LeaveComment/:leave_ID', element: <LeaveComment /> },
      { path: 'AllownsInfo/:expense_ID', element: <AllownsInfo /> },
      { path: 'AllownsComment/:expense_ID', element: <AllownsComment /> },
      { path: 'Kpi', element: <Kpi /> },
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
