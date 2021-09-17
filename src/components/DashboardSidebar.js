import { useEffect } from 'react';
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
import ForumIcon from '@material-ui/icons/ForumOutlined';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacyOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/admin.png',
  jobTitle: 'Admin',
};

  
const items = [
  {
    href: '/app/dashboard',
    icon: DashboardIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/ManagerList',
    icon: SupervisorAccountOutlinedIcon,
    title: 'Salesmanagers'
  },
  {
    href: '/app/MedicalRepList',
    icon: GroupOutlinedIcon,
    title: 'Medical Representatives'
  },
  {
    href: '/app/ProductList',
    icon: LocalPharmacyIcon,
    title: 'Products'
  },
  { 
    href: '/app/Reports',
    icon: DescriptionOutlinedIcon,
    title: 'Reports'
  },
  // {
  //   href: '/app/Forum',
  //   icon: ForumIcon,
  //   title: 'Forum'
  // },
  {
    href: '/login',
    icon: ExitToAppIcon,
    title: 'Logout'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
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
          to="/app/AdminAccount"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Admin
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

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
