import { Button, Card, Modal, stepButtonClasses, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Cargo = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '0px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [data,setData]=useState([]);

    useEffect(()=>{
        getUser()
        getData()
        
    },[])

    const [user,setUser]=useState([]);
    let jobid=[];
    //const [job,setJob] = useState("")
    async function getUser(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user`)
        result = await result.json();
        if (result.code===1) {
        setUser(result.usersList)
        //jobid.push(user.job_id)
        
            //history.push("/usuarios")
        } else {
            
        }
        
        
    }
    getJobId();
    function getJobId(){
        for (let index = 0; index < user.length; index++) {
            jobid.push(user[index].job_id)
            //console.log(jobid)
            
        }
        //getUser()
        console.log(jobid)
    }
    
    function verificar(id){
        return jobid===id
        //const found = jobid.find(element => element == id);
        //console.log(found)
        
    }
    

    async function getData(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/job`)
        result = await result.json();
        setData(result.jobList)
        
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [accion, setAccion] = useState("");

    const [cargo, setCargo] = useState({
        office: ""

    });

    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setCargo({
            ...cargo,
            [name]: value,
        });
    };

    const [cargoSelect, setCargoSelect] = useState({
        id:'',
        office:''
    })

    function nuevoCargo(){
        handleOpen()
        setAccion("Agregar")
        
    }
    async function saveCargo(){
        setAccion("Agregar")
        handleOpen()

        let result = await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/job`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(cargo)
        });
        result = await result.json();
        if (result.code===1) {
            setMensaje(result.message)
            handleClose()
            setMensaje(result.message)
            
            setError("")
            getData()
            //history.push("/usuarios")
        } else {
            setError(result.message)
            setMensaje("")
        }
    }
    
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")

    function editarCargo(elemento)
    {
        
        setAccion("Editar")
        handleOpen()
        setCargoSelect(elemento);
        
    }

    async function editCargo(id){
        
        
        let result = await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/job/`+id,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(cargo)
        });
        result= await result.json();
        if(result.code===1){
            
            handleClose()
            
            setMensaje(result.message)
            setError("")
            getData()
            
        } else{
            setError(result.message)
            setMensaje("")
            
        }
        
    }

    async function deleteCargo(dato){
         
        var opcion = window.confirm("Está seguro que desea eliminar: "+ dato.office)
        if (opcion){
            let result = await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/job/`+dato.id,{
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify(cargo)
            });
            result= await result.json();
            if(result.code===1){
                
                handleClose()
                
                setMensaje(result.message)
                setError("")
                getData()
                
            } else{
                setError(result.message)
                setMensaje("")
                
            }
        }
        
        
        
    }
    

    return (
        <div>
            <Header/><br/><br/>
            <div className="col-lg-6 m-auto">
            <Card  elevation={4}>
            {
            error!==""?
            <>
            <div className="alert alert-danger alert-dismissible fade show m-3" role="alert">
           
                
                <ErrorOutlineIcon  style={{verticalAlign:'top'}} /> {error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                
            </div>    
            </>:
            null
            }
            {
            mensaje!==""?
            <>
            <div className="alert alert-success alert-dismissible fade show m-3" role="alert">
            
                <ErrorOutlineIcon  style={{verticalAlign:'top'}}/> {mensaje}
                
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>    
            </>:
            null
            } 
            <button onClick={nuevoCargo} style={{backgroundColor:'#23498D', float:'left', fontWeight: 'bold'}} className="btn btn-sm text-white mt-4 mx-4"><AddIcon fontSize="small" /> Nuevo cargo</button>
                <div className="table-responsive p-4 col-12">
                <table className="table table-striped p-1">
                <thead className="text-white" style={{backgroundColor:'#23498D'}}>
                    <tr>
                    <th >Cargo</th>
                    <th >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                    data.map((item,index) =>(
                    <tr key={index}>
                    <td>
                    {item.office}
                    </td>
                    <td>
                    <button onClick={()=>editarCargo(item)} className="btn btn-sm text-white m-1" style={{backgroundColor:'#23498D'}}>< EditIcon fontSize="small" /> Editar</button>
                    {
                    jobid.includes(item.id)===true?
                    null:
                    <button onClick={()=>deleteCargo(item)} className="btn btn-sm text-white bg-secondary m-1"><ClearIcon fontSize="small"  /> Eliminar</button>
                    
                    
                    }
                    
                    </td>
                    </tr>
                    ))
                    }
                    
                    
                </tbody>
                </table>
                </div>
    
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2 style={{color:'#23498D'}}> {accion} Cargo {accion==="Editar"? <EditIcon fontSize="large" style={{verticalAlign:'top'}} />: null }</h2>
        
        
        <div className="form-floating mt-3 mb-2">
        <input type="text" className="form-control" id="office" onChange={handleInput} name="office" placeholder="Cargo" defaultValue={accion==='Agregar'?null:cargoSelect.office} required/>
        <label for="cargo">Ingresar Cargo</label>
        </div>
        <div className="d-flex flex-row-reverse">
        <div>
        <button onClick={handleClose} className="btn text-white bg-secondary ms-2 mt-2"> Cancelar</button>
        </div>
        <div>
        {
            accion==='Agregar'?
            <button className="btn text-white mt-2" style={{backgroundColor:'#23498D'}} onClick={saveCargo}> Agregar</button>:
            <button className="btn text-white mt-2" style={{backgroundColor:'#23498D'}} onClick={()=>editCargo(cargoSelect.id)}> Editar</button> 
        }
           
        
        </div>
        </div>
        
        
        </Box>
      </Modal>
            
            
            
            </Card>
            </div>
        </div>
    )
}

export default Cargo
