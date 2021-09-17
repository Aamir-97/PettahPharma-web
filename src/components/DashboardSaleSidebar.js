import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavItem from './NavItem';
import axios from "axios";





const user = {
  avatar: '/static/images/avatars/avatar_13.png',
  jobTitle: 'Sales Manager',

};

const items = [

  {
    href: '/appp/dashboardsale',
    icon: DashboardIcon,
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
    icon: AssignmentIcon,
    title: 'Task'
  },
  {
    href: '/appp/SummaryReport',
    icon: ListAltIcon,
    title: 'Summary Report'
  },
  // {
  //   href: '',
  //   icon: ForumIcon,
  //   title: 'Discussion Forum'
  // },
  {
    href: '/appp/Leave',
    icon: AssignmentIndIcon,
    title: 'Leave Approval'
  },
  {
    href: '/appp/Allowns',
    icon: ReceiptIcon,
    title: 'Expenses'
  },
  {
    href: '/appp/Kpi',
    icon: AssessmentIcon,
    title: 'KPI Analysis'
  },
  // {
  //   href: '/appp/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '',
  //   icon: TrendingUpIcon,
  //   title: 'Help'
  // },
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

  let manager_ID = localStorage.getItem('managerid');
  // manager_ID = JSON.parse(manager_ID)
  // console.log(manager_ID);

  let salname = localStorage.getItem('name');
  
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/viewmanager', {
            params: {
                manager_ID: manager_ID,
            }
        });
        setRow(response.data[0]);
    };
    fetchData();
  }, []);
  const [Row, setRow] = useState([]);

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
        height: '100%',
        // backgroundColor:'#5eb6b8',
        // backgroundImage: `url(${side})`
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
          src={`/${Row.display_photo}`}
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
          {salname}
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
    < >
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
