import { useEffect, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import {
 
  Settings as SettingsIcon,

  User as UserIcon,
 
  Users as UsersIcon,
  MessageSquare as Message,
  Calendar as News,
 
} from 'react-feather';
import NavItem from './NavItem';
import { AuthContext } from '../contexts/auth'
import { getProfile } from '../services/auth';

const adminItems = [
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Utilizadores'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Conta'
  },
  {
    href: '/app/suggestions',
    icon: Message,
    title: 'Sugestões'
  },
  {
    href: '/app/news',
    icon: News,
    title: 'NewsLetter'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Websites'
  }
];

const normalItems = [
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Conta'
  },
  {
    href: '/app/suggestions',
    icon: Message,
    title: 'Sugestões'
  },
  {
    href: '/app/news',
    icon: News,
    title: 'NewsLetter'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const { user, isAdmin } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    getProfile(user)
      .then((res) => {
        const { name, avatar } = res.data.user;
        setName(name);
        setAvatar(avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          src={avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          @Shoprice
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>

          {isAdmin ? adminItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          )) : normalItems.map((item) => (
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
