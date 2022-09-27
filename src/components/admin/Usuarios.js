import { Badge, Modal, Typography } from '@mui/material'
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import Header from '../Header';

import QuizIcon from '@mui/icons-material/Quiz';
import EmailIcon from '@mui/icons-material/Email';
import { useHistory } from 'react-router';

import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Box } from '@mui/system';

const Usuarios = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState("");
    const [userId, setUserId] = useState("")

    useEffect(() => {
        getData()
        getJob()
        //estadoTest(estado,userId)
        //enviarEmail(0)
    }, [])

    const [job, setJob] = useState([]);

    async function getJob() {

        let result = await fetch(`http://159.223.170.205/dev/job`)
        result = await result.json();
        if (result.code === 1) {
            setJob(result.jobList)
        }



    }
    /*async function newTest(userid){
        var opcion = window.confirm("Está seguro que desea habilitar este test?")
        if (opcion){
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
                setAlert(result.message)
                setError("")
                getData()
                getJob()
                //history.push("/usuarios")
            } else {
                setError(result.message)
                setAlert("")
            }
        }
       
    }*/

    const columnas = [
        {
            title: 'Id',
            field: 'id',
            cellStyle: { width: '0%' },
        },

        {
            title: 'Nombre',
            field: 'nombre',
            cellStyle: { width: '15%' }
        },
        {
            title: 'Dni',
            field: 'dni',
            cellStyle: { width: '5%' }
        },

        {
            title: 'Celular',
            field: 'celular',
            cellStyle: { width: '5%' }
        },
        /*{
            title:'Usuario',
            field:'username',
        },
        {
            title:'Clave',
            field:'clave',
        },*/
        {
            title: 'Correo',
            field: 'email',
        },
        {
            title: 'Rol',
            field: 'rol_id',
            cellStyle: { width: '5%' },
            render: (row) => <div>{row.rol_id === 2 ? "Candidato" : "Administrador"}</div>
        },
        {
            title: 'Cargo',
            field: 'job_id',
            render: (row) => <div>
                {
                    job.map((item, index) => (
                        row.job_id === item.id ?
                            item.office :
                            null
                    ))
                }
            </div>
        },
        {
            title: 'Creado',
            field: 'created_at',
            cellStyle: { width: '15%' },
            render: (row) => <div>{row.created_at.slice(0, 19).replace('T', ' ')}</div>
        },
        {
            title: 'Estado',
            field: 'status',
            align: 'center',
            render: (row) =>
                <div>
                    <span className={row.status ? "badge bg-danger" : "badge bg-success"}>{row.rol_id == 1 ? null : row.status ? 'No Realizado' : 'Realizado'}</span>
                </div>

        }
    ];

    async function getData() {

        try {
            //  fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user`)
            //.then((res) => res.json())
            //.then((res) => setData(res.usersList))
            let result = await fetch(`http://159.223.170.205/dev/user`)
            result = await result.json();
            setData(result.usersList)

        } catch (err) {
            console.log(err);
        }


        //console.log(data)
    }
    const history = useHistory();

    const [alert, setAlert] = useState("")
    const [error, setError] = useState("")

    async function enviarEmail(id) {
        let result = await fetch(`http://159.223.170.205/dev/user/sendemail/` + id)
        result = await result.json();
        if (result.code === 1) {
            setAlert(result.message)
            setError("")
        } else {
            setError("Correo electrónico inválido")
            setAlert("")
        }

    }
    function getFechaHoy(fecha) {
        //const f0 = new Date();
        //const f1= new Date(fecha)
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        console.log(hoy.toISOString().slice(0, 10));
        if (fecha <= hoy.toISOString().slice(0, 10)) {

            return "Vencido"
        } else {
            return "Vigente"
        }
    }

    async function estadoTest(estado, id) {
        if (estado === 'Vencido') {
            setEstado(estado);
            setUserId(id);
            const userid = {
                user_id: id
            }
            let result = await fetch(`http://159.223.170.205/dev/user/password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userid)
            });
            result = await result.json();
            if (result.code === 1) {
                //setAlert(result.message)
                //setError("")
                //getData()
                //getJob()
                //history.push("/usuarios")
                //return "Enviar Email"
            } else {
                // setError(result.message)
                // setAlert("")
            }
        } else {
            setError("No se puede actualizar contraseña")
        }



    }
    const [open, setOpen] = React.useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        //width:800,
        maxHeight: '100%',
        //bgcolor: '#B4C7E7',
        bgcolor: 'white',
        //border: '2px solid #000',
        boxShadow: 24,
        p: 4,

        overflowY: 'auto',
        overflowX: 'auto',
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [list, setList] = useState([]);

    async function getListTest(id) {
        handleOpen();
        let result = await fetch(`http://159.223.170.205/dev/test/user/` + id)
        result = await result.json();
        setList(result.data)
        //console.log(data)

    }
    return (
        <div>
            <Header /><br /><br />
            <div className="col-lg-11 m-auto">
                {
                    alert ?
                        <>
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>¡Mensaje! </strong>{alert}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </> :
                        null
                }
                {
                    error ?
                        <>
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>¡Mensaje! </strong>{error}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </> :
                        null
                }

                <MaterialTable
                    columns={columnas}
                    data={data}
                    title={<h3 className="fw-bold" style={{ color: '#23498D' }}>Lista de usuarios</h3>}
                    actions={[
                        /*{ 
                            icon:CheckBoxIcon,
                            iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                            tooltip: 'Habilitar test',
                            onClick:(e,data)=>{newTest(data.id)}
                        }, */
                        {
                            icon: 'edit',
                            iconProps: { style: { margin: "0", padding: "0" } },
                            tooltip: 'Editar usuario',
                            onClick: (e, data) => { history.push("/update/" + data.id) }
                        },
                        {
                            icon: ManageSearchIcon,
                            iconProps: { style: { margin: "0", padding: "0" } },
                            tooltip: 'Lista de test',
                            onClick: (e, data) => { getListTest(data.id) }
                        },
                        /*{ 
                            icon:QuizIcon,
                            iconProps: { style: { margin:"5px",padding:"0", marginLeft:"0"} },
                            tooltip: 'Ver test',
                            onClick:(e,data)=>{history.push("/resultado/"+data.id)}
                        },*/
                        {
                            icon: ListAltIcon,
                            iconProps: { style: { margin: "5px", padding: "0", marginLeft: "0" } },
                            tooltip: 'Detalle test',
                            onClick: (e, data) => { history.push("/list/" + data.id) }
                        },

                        {
                            icon: EmailIcon,
                            iconProps: { style: { margin: "5px", padding: "0", marginLeft: "0" } },
                            tooltip: 'Enviar correo',
                            onClick: (e, data) => { enviarEmail(data.id) }
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: { backgroundColor: "#D4D4D4" }
                    }}
                    localization={{
                        header: {
                            actions: 'Acciones',
                        },
                        toolbar: {
                            searchTooltip: 'Buscar candidatos',
                            searchPlaceholder: 'Buscar'
                        },
                        pagination: {
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

            <Modal
                open={open}
                //onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Lista de test</h2>
                    <div className="table-responsive p-1 col-12">
                        <table className="table table-striped p-1">
                            <thead className="text-white" style={{ backgroundColor: '#23498D' }}>
                                <tr>
                                    <th >N°</th>
                                    <th >Fecha de realización</th>
                                    <th >Fecha de vencimiento</th>
                                    <th >Acciones</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {item.created_at ? item.created_at.slice(0, 19).replace('T', ' ') : null}
                                            </td>
                                            <td>
                                                {item.finalized_at ? item.finalized_at.slice(0, 19).replace('T', ' ') : null}
                                            </td>

                                            <td>
                                                <button className="btn btn-sm btn-secondary m-1" > <a className="text-white" style={{ textDecoration: 'none' }} href={"/list/resultado/" + item.id + "/" + item.user_id}> Ver test </a></button>


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
                    <div className="d-flex flex-row-reverse">
                        <div>
                            <button onClick={handleClose} className="btn text-white ms-2 mt-2" style={{ backgroundColor: '#23498D' }}> Cerrar</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Usuarios