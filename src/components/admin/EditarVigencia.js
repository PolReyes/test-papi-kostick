import { Card } from '@mui/material'
import React, { useState } from 'react'
import Header from '../Header'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const EditarVigencia = () => {
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")

    const [dias, setDias] = useState({
        count_days: ""

    });

    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDias({
            ...dias,
            [name]: value,
        });
    };

    async function editVigencia(){
        
        
        let result = await fetch(`http://137.184.89.132/dev/test/date/all`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(dias)
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
             <Header/><br/><br/><br/>
             <div className="container">
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
            <div className="form-floating m-4">
        <input type="text" className="form-control" onChange={handleInput} name="count_days"  required/>
        <label for="dias">Ingresar días</label>
        </div>
        <div className="d-flex flex-row-reverse">
        <button className="btn text-white m-4" style={{backgroundColor:'#23498D'}}  onClick={editVigencia}> Editar</button>
            </div>
        
            </Card>
             </div>
                 </div>
             
             
        </div>
    )
}

export default EditarVigencia
