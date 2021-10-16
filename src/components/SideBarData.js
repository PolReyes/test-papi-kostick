import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
//import { Typography } from '@mui/material';






export const SidebarData = [
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: <PeopleIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Nuevo Usuario',
    path: '/create',
    icon: <PersonAddIcon />,
    cName: 'nav-text'
  },

];
//