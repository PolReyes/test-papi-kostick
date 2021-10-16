import React,{useEffect} from 'react'
//import Header from './Header';
import { useHistory } from 'react-router-dom';

const Protected = (props) => {

    const user= JSON.parse(localStorage.getItem("user-info"));

    let Cmp=props.Cmp

    const history=useHistory();
    useEffect(()=>{
        if(!localStorage.getItem("user-info") || user.data.rol_id===2){
            localStorage.clear();
            history.push('/')
        }
    },[])

    return (
        <div>
            <Cmp/>
        </div>
    )
}

export default Protected