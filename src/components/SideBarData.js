import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
//import { Typography } from '@mui/material';






export const SidebarData = [
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: <PeopleIcon />,
    cName: 'nav-text'
  },
  /*
    title: 'Vigencia Test',
    path: '/vigencia',
    icon: <ListAltIcon />,
    cName: 'nav-text'
*/
  {
    title: 'Editar vigencia',
    path: '/editarVigencia',
    icon: <EditIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Nuevo Usuario',
    path: '/create',
    icon: <PersonAddIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Cargo',
    path: '/cargo',
    icon: <WorkIcon />,
    cName: 'nav-text'
  }

];
//