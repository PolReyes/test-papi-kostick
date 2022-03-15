import React, { useEffect, useState } from 'react'
import Header from '../Header'
import '../css/styles.css';
import { Alert, Card, Grid, TextField, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useHistory } from 'react-router';

import imgCrear from '../img/RPA.jpg'

const Create = () => {
    const [data,setData]=useState([]);

    useEffect(()=>{
        getData()
        
    },[])

    async function getData(){
        let result= await fetch(`http://137.184.89.132/dev/job`)
        result = await result.json();
        setData(result.jobList)
        
    }

    const [dataUsuario, setDataUsuario] = useState({
        name: "",
        documentNumber: "",
        phone:"",
        username:"",
        password:"",
        rol_id:"",
        job_id:"",
        email:""

    });

    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDataUsuario({
            ...dataUsuario,
            [name]: value,
        });
    };
    
    const history=useHistory();

    async function agregar(){
    
        //console.warn("data",email,password)
        //let item={email,password}
        //http://localhost:8000
        let result = await fetch(`http://137.184.89.132/dev/user`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(dataUsuario)
        });
        result = await result.json();
        if (result.code===1) {
            setMensaje(result.message)
            setError("")
            //history.push("/usuarios")
        } else {
            setError(result.message)
            setMensaje("")
        }
       
        
    }
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")

    return (
        <div>
            <Header/><br/><br/>
            <div className="col-lg-6 m-auto">
            <Card  elevation={4}>
                <img src={imgCrear} className="mb-2"/>
            <Typography style={{fontWeight: 'bold'}} variant="h4" color="primary" gutterBottom margin={4}>
            <PersonAddIcon fontSize="large" style={{verticalAlign:'top'}}/> Registro de nuevo candidato
            </Typography>
            {
            error?
            <>
            <div className="alert alert-danger d-flex align-items-center m-3" role="alert">
                <div>
                <ErrorOutlineIcon/> {error}
                </div>
                </div>    
            </>:
            null
            }
            {
            mensaje?
            <>
            <div className="alert alert-success d-flex align-items-center m-3" role="alert">
                <div>
                <ErrorOutlineIcon/> {mensaje}
                </div>
                </div>    
            </>:
            null
            }
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="name" placeholder="Nombre" required />
                    <label for="nombre">Nombre</label>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="email" placeholder="Correo electrónico" required />
                    <label for="email">Correo eletrónico</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="documentNumber" placeholder="Dni" required/>
                    <label for="dni">Número de documento</label>
                    </div>
                </div>
                <div className="col-lg-6 ">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="phone" placeholder="Teléfono" required/>
                    <label for="telefono">Teléfono</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 ">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="username" placeholder="Usuario" required/>
                    <label for="usuario">Usuario</label>
                    </div>
                </div>
                <div className="col-lg-6 ">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="password" placeholder="Contraseña" required/>
                    <label for="contraseña">Contraseña</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 ">
                    <div className="form-floating m-3">
                    <select className="form-select" id="rol" name="rol_id" onChange={handleInput}>
                    <option selected>Seleccionar</option>
                    <option value="1">Administrador</option>
                    <option value="2">Candidato</option>
                    </select>
                    <label for="rol">Rol</label>
                    </div>
                </div>
                <div className="col-lg-6 ">
                    <div className="form-floating m-3">
                    <select className="form-select" id="Cargo" name="job_id" onChange={handleInput}>
                    <option selected>Seleccionar</option>
                    {
                    data?.map((item,index)=>(

                    <option key={index} value={item.id}>
                    {item.office}
                    </option>
                    ))
                    }
                    </select>
                    <label for="Cargo">Cargo</label>
                    </div>

                    
                </div>
            </div>
            
            
            <div>
            <button className="btn btn-primary m-4 fw-bold" onClick={agregar} >Agregar</button>
            </div>
            
            
            
            
            
            </Card>
            </div>
        </div>
    )
}

export default Create
