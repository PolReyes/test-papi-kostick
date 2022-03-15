import React, { useEffect, useState } from 'react'
import Header from '../Header'
import MaterialTable from 'material-table';

const Vigencia = () => {
    const [data,setData]=useState([]);

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        
        let result= await fetch(`http://137.184.89.132/dev/user/list/test`)
        result = await result.json();
        if (result.code===1) {
            setData(result.usersList)
        }
        
        
        
    }
    const columnas=[
        /*{
            title:'Id',
            field:'id',
            //cellStyle:{width:'0%'},
        },*/
        
        {
            title:'Nombre',
            field:'nombre',
            //cellStyle:{width:'15%'}
        },
        /*{
            title:'Dni',
            field:'dni',
            cellStyle:{width:'5%'}
        },*/
        /*{
            title:'Celular',
            field:'celular',
            cellStyle:{width:'5%'}
        }, */   
        /*{
            title:'Usuario',
            field:'username',
        },
        {
            title:'Clave',
            field:'clave',
        },*/
        /*{
            title:'Correo',
            field:'email',
        },*/
        /*{
            title:'Rol',
            field:'rol_id',
            //cellStyle:{width:'5%'},
            render:(row)=><div>{row.rol_id===2?"Candidato":"Administrador"}</div>
        },*/
        /*{
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
        }, */
        {
            title:'Vence',
            field:'finalized_at',
            //cellStyle:{width:'15%'},
            render:(row)=><div>{row.finalized_at.slice(0,19).replace('T',' ')}</div>
        },
        {
            title:'Estado',
            field:'status_test',
            align:'center',
            render:(row)=>
            <div>
            <span className={row.status_test==='VENCIDO'?"badge bg-danger":"badge bg-success"}>{row.status_test}</span>
            </div>
            
        }
    ];
    return (
        <div>
            <Header/><br/><br/>
            <div className="col-lg-6 m-auto">
            <MaterialTable
          columns={columnas}
          data={data}
          title= {<h3 className="fw-bold" style={{color:'#23498D'}}>Lista de Test</h3>}
          actions={[
            /*{ 
                icon:CheckBoxIcon,
                iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                tooltip: 'Habilitar test',
                onClick:(e,data)=>{newTest(data.id)}
            }, */
            /*{
                icon:'edit',
                iconProps: { style: { margin:"0",padding:"0"} },
                tooltip: 'Editar usuario',
                //onClick:(e,data)=>{history.push("/update/"+data.user_id)}
            },*/
            /*{ 
                icon:QuizIcon,
                iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                tooltip: 'Ver test',
                onClick:(e,data)=>{history.push("/resultado/"+data.id)}
            },*/
           /* { 
                icon:ListAltIcon,
                iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                tooltip: 'Ver test',
                onClick:(e,data)=>{history.push("/list/"+data.user_id)}
            },*/
            
            /*{ 
                icon:EmailIcon,
                iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                tooltip: 'Enviar correo',
                onClick:(e,data)=>{ enviarEmail(data.id)}
            }*/
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

export default Vigencia
