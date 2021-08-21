import { useEffect,useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import ForumIcon from '@material-ui/icons/Forum';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavItem from './NavItem';
import axios from "axios";




    

const user = {
  avatar: '/static/images/avatars/avatar_3.png',
  jobTitle: 'Sales Manager',
  
};

const items = [

  {
    href: '/appp/dashboardsale',
    icon: BarChartIcon,
    title: 'Dashboard'

  },
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Employees'
  // },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  {
    href: '/appp/dataplan',
    icon: ForumIcon,
    title: 'Task'
  },
  {
    href: '/appp/SummaryReport',
    icon: ForumIcon,
    title: 'Summary Report'
  },
  {
    href: '',
    icon: ForumIcon,
    title: 'Discussion Forum'
  },
  {
    href: '/appp/Leave',
    icon: ForumIcon,
    title: 'Leave Approval'
  },
  {
    href: '/appp/Leave',
    icon: ForumIcon,
    title: 'Allowns'
  },
  {
    href: '',
    icon: ForumIcon,
    title: 'KPI'
  },
  {
    href: '/appp/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '',
    icon: TrendingUpIcon,
    title: 'Help'
  },
  // {
  //   href: '',
  //   icon: ForumIcon,
  //   title: 'Discussion Forum'
  // },
  // {
  //   href: '',
  //   icon: TrendingUpIcon,
  //   title: 'Sales Summary'
  // },
  {
    href: '/login',
    icon: ExitToAppIcon,
    title: 'Logout'
  },
];

const DashboardSaleSidebar = ({ onMobileClose, openMobile }) => {

  let manager_ID=localStorage.getItem('managerid');
  manager_ID =JSON.parse(manager_ID)
  console.log(manager_ID);

useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/getmanagername', {
              params: {
                  
                  manager_ID: manager_ID,
              }
          });

          setDt(response.data[0]);
          // console.log(response.data[0]);
      };
      fetchData();
  }, []);

  const [Dt, setDt] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/appp/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {/* {Dt.name} */}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>

      </Box>
      <Box sx={{ flexGrow: 1 }} />

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSaleSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSaleSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSaleSidebar;
