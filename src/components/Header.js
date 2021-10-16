import { Link,useHistory } from 'react-router-dom'
import React, { useState } from 'react';
//import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SideBarData';

//import { IconContext } from 'react-icons';
//import logo from '../RpaLatam.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
//import Usuarios from './admin/Usuarios';
//import Test from './user/Test';
import logo from './img/RpaLatam.png'

const Header = () => {
    const history=useHistory();

    const user= JSON.parse(localStorage.getItem("user-info"));

    //console.warn(user)

    function logout(){
        localStorage.clear();
        history.push('/')
    }

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>

      
      
      <div className='navbar shadow'>
      <div className="container-fluid">
          <Link to='#' className='menu-bars'>
          <MenuIcon fontSize="large" onClick={showSidebar} style={{color:'#fff'}}/>
          </Link>
          
          {/*<img  src={logo}/>*/}
          <div className="row">
            {
                localStorage.getItem("user-info") && user.data.rol_id===1?
                <>
                
                <div class="dropdown">
                <button class="btn btn-white dropdown-toggle text-white fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {user && user.data.nombre}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" >Perfil</a></li>
                <li><a class="dropdown-item" onClick={logout}>Salir</a></li>
                </ul>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                <CloseIcon fontSize="large" style={{color:'#000'}}/>
                </Link>
                </li>
                {SidebarData.map((item, index) => {
                return (
                <li key={index} className={item.cName}>
                <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
                </Link>
                </li>

                );
                })}
                </ul>
                </nav>
               
                </>
                :
                <>
                
                <div class="dropdown">
                <button class="btn btn-white dropdown-toggle text-white fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {user && user.data.nombre}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" >Perfil</a></li>
                <li><a class="dropdown-item" onClick={logout}>Salir</a></li>
                </ul>
                </div>
                </>
            }
            </div>
            
            </div>
            </div><br/><br/><br/><br/>
            <img src={logo} />   
        
    </>
        
    )
}

export default Header
