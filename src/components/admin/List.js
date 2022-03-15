import { Card, Modal } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import Header from '../Header'
import EditIcon from '@mui/icons-material/Edit';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const List = (props) => {
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
    const [candidato, setCandidato] = useState([]);
    const [job,setJob]=useState([]);

    useEffect(()=>{
        getData();
        getCandidato();
        getJob();
    },[])

    async function getData(){
        let result= await fetch(`http://137.184.89.132/dev/test/user/`+props.match.params.id)
        result = await result.json();
        setData(result.data)
        //console.log(data)
        
    }
    async function getCandidato(){
        let result= await fetch(`http://137.184.89.132/dev/user/`+props.match.params.id)
        result = await result.json();
        if (result.code===1) {
          setCandidato(result.data)  
          //console.log(test.data.respuesta)
        } else {
          //setError("El candidato no ha realizado el test")
        }
        
        
       // console.log(data)
    }
    
    async function getJob(){
        let result= await fetch(`http://137.184.89.132/dev/job`)
            result = await result.json();
            if (result.code===1) {
                setJob(result.jobList)
        }



    }

    const [detail,setDetail] = useState({
        user_id: '',
        testKostick_id: '',
        count_days: ''
    })

    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDetail({
            ...detail,
            [name]: value,
        });
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [estado, setEstado] = useState("")

    function getDetail(id,userid,days)
    {
        //console.log(elemento)
        
        handleOpen()
        setDetail({
            ...detail,
            user_id:userid,
            testKostick_id:id,
            count_days: days,
        });        
    }

    async function editFechaVen(){
        
        
        let result = await fetch(`http://137.184.89.132/dev/test/days`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(detail)
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

    function getFechaHoy(fecha){
        //const f0 = new Date();
        //const f1= new Date(fecha)
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        console.log(hoy.toISOString().slice(0,10));
        if (fecha<=hoy.toISOString().slice(0,10)) {
            
            return "Vencido"
        } else {
            return "Vigente"
        }
    }

    /*async function newTest(userid){

        const id ={
            user_id:userid
        }

        let result = await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user/status`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(id)
        });
        result = await result.json();
        if (result.code===1) {
            setMensaje(result.message)
            
            setError("")
            //getData()
            //history.push("/usuarios")
        } else {
            setError(result.message)
            setMensaje("")
        }
    }*/
    return (
        <div>
            <Header/><br/><br/>
            <div className="col-lg-10 m-auto">
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
            <div className="card col-12" >
            <div className="card-body" style={{backgroundColor:'#23498D'}}>
            <div className="d-flex justify-content-around">
                
          
              <div><h5 className="text-white">Candidato: {candidato.nombre}</h5></div>
              <div><h5 className="text-white">DNI: {candidato.dni} </h5></div>
              <div><h5 className="text-white">Cargo: {
                    job.map((item,index)=>(
                      candidato.job_id===item.id?
                      item.office:
                      null
                    ))
                }</h5></div>
          </div>
          </div>
          </div>
          {candidato.rol_id===1?

            <h3 className="fw-bold m-2">Este usuario no presenta test</h3>
            :
            <>
            <div className="table-responsive p-4 col-12">
                <table className="table table-striped p-1">
                <thead className="text-white" style={{backgroundColor:'#23498D'}}>
                    <tr>
                    <th>N° Test</th>
                    <th>Fecha de realización</th>
                    <th>Fecha de vencimiento</th>
                    <th>Días</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                data?.map((item,index)=>(
                    <tr key={index}>
                       <td>
                      { index + 1 }
                       </td>
                       <td>
                      { item.created_at?item.created_at.slice(0,19).replace('T',' '):null }
                       </td>
                       <td>
                      { item.finalized_at?item.finalized_at.slice(0,19).replace('T',' '):null }
                       </td>
                       <td>
                      { item.count_days }
                       </td>
                       <td>
                       <h5><span className={getFechaHoy(item.finalized_at.slice(0,10))==="Vencido"?"badge bg-danger":"badge bg-success"}>{getFechaHoy(item.finalized_at.slice(0,10))}</span></h5>
                        
                       </td>
                       <td>
                           <button className="btn btn-sm btn-secondary m-1" > <a className="text-white" style={{textDecoration:'none'}} href={"/list/resultado/"+item.id+"/"+item.user_id}> Ver test </a></button>
                           <button  className="btn btn-sm btn-secondary m-1" onClick={()=>getDetail(item.id,item.user_id,item.count_days)} > <a > Editar fecha</a></button>
                           
                       </td>
                       {/*<td>
                           {getFechaHoy(item.finalized_at.slice(0,10))==="Vigente"?
                           null
                           :
                           <button onClick={()=>newTest(item.user_id)}  className="btn btn-sm text-white m-1" style={{backgroundColor:'#23498D'}} >Habilitar</button>
                           }
                       </td>*/}
                   </tr>
                   
                
                ))
                }
                   
                    
                    
                </tbody>
                </table>
            </div>
            </>

        } 
            
                <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h3 style={{color:'#23498D'}}> <EditIcon fontSize="large" style={{verticalAlign:'top'}} /> Fecha de vencimiento </h3>
        <input onChange={handleInput} type="text" hidden className="form-control" name="testKostick_id" value={detail.testKostick_id} required/>
        <input onChange={handleInput} type="text" hidden className="form-control" name="user_id" value={detail.user_id} required/>
        <div className="form-floating mt-3 mb-2">
        <input onChange={handleInput} type="text" className="form-control" name="count_days" placeholder="Cargo" defaultValue={detail.count_days} required/>
        <label for="cargo">Ingresar días</label>
        </div>
        <div className="d-flex flex-row-reverse">
        <div>
        <button onClick={handleClose}  className="btn text-white bg-secondary  mt-2"> Cancelar</button>
        <button onClick={editFechaVen} className="btn text-white ms-2 mt-2" style={{backgroundColor:'#23498D'}}> Editar</button> 
        </div>
        
        </div>
        
        
        
        </Box>
      </Modal>
            
            
            </Card>
            </div>
        </div>
    )
}

export default withRouter(List)
