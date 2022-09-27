import { Card, Typography } from '@mui/material'
import React, { useState } from 'react'
//import Header from './Header'
import LoginIcon from '@mui/icons-material/Login';
import { useHistory } from 'react-router';
//import api from '../Api';
import '../App.css';
import '../components/css/styles.css'
//import { minHeight } from '@mui/system';
import imgInicio from '../components/img/Tecnologia-RPA.jpg'
import logo from '../components/img/RpaLatam.png'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Login = () => {

    const [alert, setAlert] = useState("");

    const [dataLogin, setDataLogin] = useState({
        username: "",
        password: "",
    });

    const history = useHistory();

    const handleInput = (event) => {
        const { value, name } = event.target;

        setDataLogin({
            ...dataLogin,
            [name]: value,
        });
    };


    /*useEffect(()=>{
        if(localStorage.getItem("user-info")){
            history.push('/')
        }
    },[])*/

    async function login() {

        //console.warn("data",email,password)
        //let item={email,password}
        //http://localhost:8000
        let result = await fetch(`http://159.223.170.205/dev/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(dataLogin)
        });
        result = await result.json();

        if (result.data != null) {
            if (result.data.rol_id === 1 && result.data.status === true) {
                localStorage.setItem("user-info", JSON.stringify(result));
                history.push("/usuarios")
            } else if (result.data.rol_id === 2 && result.data.status === true) {
                localStorage.setItem("user-info", JSON.stringify(result));
                history.push("/test")
                //console.log(alert)
            }
        } else {
            setAlert(result.message)
            history.push("/")
        }


    }
    return (
        <div className="Bg">
            <div className="m-auto vh-100 row justify-content-center align-items-center col-lg-10" >
                <div className="row ">
                    <div className="col-lg-4 m-0 p-0">
                        <Card style={{ width: '100%', height: '100%', backgroundColor: '#DAE3F3' }} elevation={4}>
                            <img src={logo} className="m-4" />
                            <Typography style={{ fontWeight: 'bold' }} variant="h4" color="primary" gutterBottom margin={4}>
                                Bienvenido a RPA Latam
                            </Typography>
                            <div class="form-floating m-4">
                                <input type="text" class="form-control" id="usuario" onChange={handleInput} name="username" placeholder="Usuario" required />
                                <label for="usuario">Usuario</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="password" class="form-control" id="clave" onChange={handleInput} name="password" placeholder="Contraseña" required />
                                <label for="clave">Contraseña</label>
                            </div>

                            <div>
                                <button className="btn btn-primary m-4 fw-bold" onClick={login}>Ingresar <LoginIcon sx={{ mx: 1 }} /></button>
                            </div>
                            {
                                alert ?
                                    <>
                                        <div className="alert alert-danger d-flex align-items-center col-lg-11 m-auto" role="alert">
                                            <div>
                                                <ErrorOutlineIcon /> {alert}
                                            </div>
                                        </div>
                                    </> :
                                    null
                            }

                        </Card>
                    </div>
                    <div className="col-lg-8 m-0 p-0">
                        <img src={imgInicio} style={{ width: '100%', height: '100%', margin: 0 }} />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login
