import React, { useEffect, useState } from 'react'
import Header from '../Header'
import '../css/styles.css';
import { Alert, Card, Grid, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useHistory, withRouter } from 'react-router';

import imgCrear from '../img/RPA.jpg'

const Update = (props) => {
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [candidato, setCandidato] = useState([]);
    const [job, setJob] = useState([])

    useEffect(()=>{
        getCandidato()
        getJob()
    },[])

    async function getCandidato(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user/`+props.match.params.id)
        result = await result.json();
        if (result.code===1) {
          setCandidato(result.data)
          setDataUsuario({
            name: result.data.nombre,
            documentNumber: result.data.dni,
            phone:result.data.celular,
            username:result.data.username,
            password:result.data.clave,
            rol_id:result.data.rol_id,
            job_id:result.data.job_id,
            email:result.data.email
        })  
        //console.log(candidato)
        } else {
          setError("El candidato no existe")
        }
    }
    async function getJob(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/job`)
        result = await result.json();
        setJob(result.jobList)
        
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
    
    async function editCandidato(id){
        
        
        let result = await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user/`+id,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(dataUsuario)
        });
        result= await result.json();
        if(result.code===1){
            setMensaje(result.message)
            setError("")
        } else{
            setError(result.message)
            setMensaje("")
            
        }
        
    }
    return (
        <div>
            <Header/><br/><br/>
            <div className="col-lg-6 m-auto">
            <Card  elevation={4}>
                <img src={imgCrear} className="mb-2"/>
            <Typography style={{fontWeight: 'bold'}} variant="h4" color="primary" gutterBottom margin={2}>
            <EditIcon fontSize="large" style={{verticalAlign:'top'}}/> Actualizar candidato
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
                <div className="col-lg-6 pe-0">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="name" placeholder="Nombre" required defaultValue={candidato.nombre}/>
                    <label for="nombre">Nombre</label>
                    </div>
                </div>
                <div className="col-lg-6 ps-0">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="email" placeholder="Correo electrónico" required defaultValue={candidato.email}/>
                    <label for="email">Correo eletrónico</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 pe-0">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="documentNumber" placeholder="Dni" required defaultValue={candidato.dni}/>
                    <label for="dni">Número de documento</label>
                    </div>
                </div>
                <div className="col-lg-6 ps-0">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="phone" placeholder="Teléfono" required defaultValue={candidato.celular}/>
                    <label for="telefono">Teléfono</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 pe-0">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="username" placeholder="Usuario" required defaultValue={candidato.username}/>
                    <label for="usuario">Usuario</label>
                    </div>
                </div>
                <div className="col-lg-6 ps-0">
                    <div className="form-floating m-3">
                    <input type="text" className="form-control" onChange={handleInput} name="password" placeholder="Contraseña" required defaultValue={candidato.clave}/>
                    <label for="contraseña">Contraseña</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 pe-0">
                    <div className="form-floating m-3">
                    <select className="form-select" id="rol_id" name="rol_id" onChange={handleInput}>
                        {
                            candidato.rol_id==1?
                            <>
                            <option selected value="1">Administrador</option>
                            <option value="2">Candidato</option>
                            </>:
                            <>
                            <option value="1">Administrador</option>
                            <option selected  value="2">Candidato</option>
                            </>
                        }
                    
                    </select>
                    <label for="rol_id">Rol</label>
                    </div>
                </div>
                    <div className="col-lg-6 ps-0">
                    <div className="form-floating m-3">
                    <select className="form-select" id="Cargo" name="job_id" onChange={handleInput}>
                        
                    {
                    job.map((item,index)=>(
                    candidato.job_id===item.id?
                    <>
                    <option selected key={item.id}>{item.office} </option>
                    </>:    
                    <>
                    <option key={index}>{item.office} </option>
                    </>
                    ))
                    }
                    </select>
                    <label for="Cargo">Cargo</label>
                    </div>

                    
                </div>
            </div>
            
            
            <div>
            <button className="btn btn-primary m-4 fw-bold"  onClick={()=>editCandidato(candidato.id)}>Actualizar</button>
            </div>
            
            
            
            
            
            </Card>
            </div>
        </div>
    )
}

export default withRouter(Update)

