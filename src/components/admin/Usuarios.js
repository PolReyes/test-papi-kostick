import { Badge, Typography } from '@mui/material'
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import Header from '../Header';

import QuizIcon from '@mui/icons-material/Quiz';
import EmailIcon from '@mui/icons-material/Email';
import { useHistory } from 'react-router';

const Usuarios = () => {
    const [data,setData]=useState([]);

    useEffect(()=>{
        getData()
        getJob()
        //enviarEmail(0)
    },[])

    const [job,setJob]=useState([]);

    async function getJob(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/job`)
        result = await result.json();
        if (result.code===1) {
            setJob(result.jobList)
        }
        
        
        
    }

    const columnas=[
        {
            title:'Id',
            field:'id',
            cellStyle:{width:'0%'}
        },
        
        {
            title:'Nombre',
            field:'nombre',
            cellStyle:{width:'15%'}
        },
        {
            title:'Dni',
            field:'dni',
            cellStyle:{width:'5%'}
        },
        
        {
            title:'Celular',
            field:'celular',
            cellStyle:{width:'5%'}
        },    
        {
            title:'Usuario',
            field:'username',
        },
        {
            title:'Clave',
            field:'clave',
        },
        {
            title:'Correo',
            field:'email',
        },
        {
            title:'Rol',
            field:'rol_id',
            cellStyle:{width:'5%'},
            render:(row)=><div>{row.rol_id===2?"Candidato":"Administrador"}</div>
        },
        {
            title:'Cargo',
            field:'job_id',
            render:(row)=><div>
                {
                    job.map((item,index)=>(
                        row.job_id===item.id?
                        item.office:
                        null
                    ))
                }
                </div>
        },
        {
            title:'Creado',
            field:'created_at',
            render:(row)=><div>{row.created_at.slice(0,19).replace('T',' ')}</div>
        },
        {
            title:'Estado',
            field:'status',
            align:'center',
            render:(row)=>
            <div>
            <span className={row.status?"badge bg-danger":"badge bg-success"}>{row.rol_id==1?null:row.status?'No Realizado':'Realizado'}</span>
            </div>
            
        }
    ];

    async function getData(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user`)
        result = await result.json();
        setData(result.usersList)
        //console.log(data)
    }
    const history=useHistory();
    
    const [alert, setAlert] = useState("")
    const [error, setError] = useState("")
    
    async function enviarEmail(id){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user/sendemail/`+id)
        result = await result.json();
        if(result.code===1){
            setAlert(result.message)
            setError("")
        }else{
            setError("Correo electrónico inválido")
            setAlert("")
        }
    
    }
    return (
        <div>
            <Header/><br/><br/>
            <div className="col-lg-11 m-auto">
                {
                    alert?
                    <>
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Mensaje! </strong>{alert}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    </>:
                    null
                }
                {
                    error?
                    <>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>¡Mensaje! </strong>{error}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    </>:
                    null
                }
            
            <MaterialTable
          columns={columnas}
          data={data}
          title= {<h3 className="fw-bold" style={{color:'#23498D'}}>Lista de usuarios</h3>}
          actions={[
            {
                icon:'edit',
                iconProps: { style: { margin:"0",padding:"0"} },
                tooltip: 'Editar usuario',
                onClick:(e,data)=>{history.push("/update/"+data.id)}
            },
            { 
                icon:QuizIcon,
                iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                tooltip: 'Ver test',
                onClick:(e,data)=>{history.push("/resultado/"+data.id)}
            },
            { 
                icon:EmailIcon,
                iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                tooltip: 'Enviar correo',
                onClick:(e,data)=>{ enviarEmail(data.id)}
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            headerStyle:{backgroundColor:"#D4D4D4"}
          }}
          localization={{
            header:{
                  actions: 'Acciones',
            },
            toolbar: {
                searchTooltip: 'Buscar candidatos',
                searchPlaceholder: 'Buscar'
            },
            pagination:{
                labelRowsSelect: 'Filas',
                labelDisplayedRows: '{from}-{to} de {count}',
                firstTooltip: 'Primera página',
                previousTooltip: 'Anterior página',
                nextTooltip: 'Siguiente página',
                lastTooltip: 'Última página',
            }
          }}
          />
            </div>
            
           
        </div>
    )
}

export default Usuarios