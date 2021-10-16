import { Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import Header from '../Header'
import { Radar } from 'react-chartjs-2';

const Resultado = (props) => {
    const [data,setData]=useState([]);
    const [test,setTest]=useState([]);
    
    const [candidato, setCandidato] = useState([]);
    const [error,setError]=useState("");

    useEffect(()=>{
        Chart()
        getData()
        getTest()
        getCandidato()
        
    },[])

    async function getData(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/test/result/`+props.match.params.id)
        result = await result.json();
        if (result.code===1) {
          setData(result)  
        } else {
          setError("El candidato no ha realizado el test")
        }
        
        
       // console.log(data)
    }
    const [chartData, setChartData]  = useState({}); 
    let suma=[]
    //let factor=[]
    async function getTest(){
     
      let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/test/`+props.match.params.id)
      result = await result.json();
      if (result.code===1) {
        setTest(result) 
        for (const Obj of result.data) {
          //setSuma(Obj.respuesta)
          suma.push(Obj.respuesta)
          //factor.push(Obj.factor_id)
        }
        console.log(suma)
      } else {
        setError("El candidato no ha realizado el test")
      }
      
      
     // console.log(data)
  }//
  async function getCandidato(){
    let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/user/`+props.match.params.id)
    result = await result.json();
    if (result.code===1) {
      setCandidato(result.data)  
      //console.log(test.data.respuesta)
    } else {
      //setError("El candidato no ha realizado el test")
    }
    
    
   // console.log(data)
}
const Chart = () => {
  setChartData({
    labels: [
      ['Necesidad de terminar una tarea','N'],
      ['Papel de trabajador duro e intenso','G'],
      ['Necesidad de logro','A'],
      ['Rol de líder','L'],
      ['Necesidad de controlar a otros','P'],
      ['Facilidad para tomar decisiones','I'],
      ['Dinamismo','T'],
      ['Tipo vigoroso','V'],
      ['Necesidad de ser notado','X'],
      ['Expansión social','S'],
      ['Necesidad de pertenecer a grupos','B'],
      ['Necesidad de cercanía y afecto','O'],
      ['Tipo teórico','R'],
      ['Interés en trabajar con detalles','D'],
      ['Tipo organizado','C'],
      ['Conservadurismo','Z'],
      ['Moderación emocional','E'],
      ['Contemporización','K'],
      ['Necesidad de consultar superiores','F'],
      ['Necesidad de normas supervisión','W']
    ],
    datasets: [
      {
        label: 'Suma de respuestas',
        data: suma,
        backgroundColor: 'rgba(180, 199, 231, 0.2)',
        borderColor: 'rgba(47, 85, 151, 1)',
        borderWidth: 1,
        //fill:false
      },
    ],
         });
};

const options = {
  scales: {
    r: {
      pointLabels: {
        font: {
          size: 12
        }
      }
    },
    
  },
  ticks: { beginAtZero: true },
};
    return (
        <div>
             <Header/><br/><br/>
            <Grid xs={12} md={10} style={{ minHeight: '100vh', margin:'auto',}} item  >
            <Card sx={{ padding:'20px'}} elevation={4}>
            <Typography style={{fontWeight: 'bold'}} variant="h4" color="primary" gutterBottom margin={4}>
            {data.message}
            </Typography>
          <div className="card">
          <div className="card-body" style={{backgroundColor:'#23498D'}}>
          <div className="d-flex justify-content-around">
              <div><h5 className="text-white">Candidato: {candidato.nombre}</h5></div>
              <div><h5 className="text-white">DNI: {candidato.dni}</h5></div>
              <div><h5 className="text-white">Cargo: {candidato.job_id==1?"Desarrollador Python":"Desarrollador NodeJs"}</h5></div>
          </div>
          
          
          
          
          
          
          </div>
          </div>
           {
             data.code===1 && test.code===1?
             <>
             <div className="table-responsive">
             <table class="table table-bordered">
  <thead className="bg-light">
    <tr>
      <th scope="col">Factor</th>
      <th scope="col">Suma</th>
      <th scope="col">Definicion polo bajo</th>
      <th scope="col">0</th>
      <th scope="col">1</th>
      <th scope="col">2</th>
      <th scope="col">3</th>
      <th scope="col">4</th>
      <th scope="col">5</th>
      <th scope="col">6</th>
      <th scope="col">7</th>
      <th scope="col">8</th>
      <th scope="col">9</th>
      <th scope="col">Definicion polo alto</th>
      <th scope="col">Fac. 2do orden</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td><h5>N</h5></td>
      <td>{test.data? <h5>{test.data[0].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong>VERSATILIDAD:</strong> le gusta iniciar las cosas y que otras personas las terminen</p>
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[0].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[0].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >N</span>:null
        }
      </td>
      
      <td>
      <p className="text-start"><strong>PERSISTENCIA:</strong> Le gusta terminar personalmente todo aquello que comienza. Resistencia a delegar</p>
      </td>
      <td className="align-middle" rowSpan="3">
        {
        (data.data ?
          <>
            <h5>{data.data[0].dimension}</h5>
            <h5>{data.data[0].promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {data.data[0].promedio>=3 && data.data[0].promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {data.data[0].promedio>=7 && data.data[0].promedio<=9?<span class="badge bg-success">Alto</span>:null}</h5>
            <h5>{data.data[0].promedio}</h5>
          </>            
          : "Cargando...")

        }
          
      </td>

    </tr>
    <tr>
      
      <td><h5>G</h5></td>
      <td>{test.data? <h5>{test.data[1].respuesta}</h5>:"cargando"}</td>
      <td>
          <p className="text-start"><strong>ECONOMÍA DE ESFUERZO:</strong> Escasa identificación con el trabajo duro</p>
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[1].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[1].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >G</span>:null
        }
      </td>
      <td>
      <p className="text-start"><strong>INTENSIDAD ÉRGICA:</strong> Trabajador intenso, esforzado, laborioso</p>
      </td>
      

    </tr>
    <tr>
      
      <td><h5>A</h5></td>
      <td>{test.data? <h5>{test.data[2].respuesta}</h5>:"cargando"}</td>
      <td>  
      <p className="text-start"><strong>CONFORMISMO:</strong> Se conforma con metas mediocres ambiciones realistas</p>
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[2].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[2].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >A</span>:null
        }
      </td> 
      <td>
      <p className="text-start"><strong>AMBICIÓN DE LOGRO:</strong> Competitivo con tendencia a superarse a sí mismo y a los demás</p>
      </td>


    </tr>
    <tr>
      
      <td><h5>L</h5></td>
      <td>{test.data? <h5>{test.data[3].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>INSEGURIDAD DIRECTIVA:</strong> Sentimiento de inferioridad en cuanto a condiciones directivas</p>
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[3].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[3].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >L</span>:null
        }
      </td>
      <td>
      <p className="text-start"><strong>AUTOIMAGEN DE LÍDER:</strong> Confianza en sus condiciones de líder. Preocupado por el estatus</p>
      </td>
      <td class="align-middle" rowSpan="3">
        {
        (data.data ?
          <>
            <h5>{data.data[1].dimension}</h5>
            <p>(dotes de mando)</p>
            <h5>{data.data[1].promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {data.data[1].promedio>=3 && data.data[1].promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {data.data[1].promedio>=7 && data.data[1].promedio<=9?<span class="badge bg-success">Alto</span>:null}</h5>
            <h5>{data.data[1].promedio}</h5>
          </>            
          : "Cargando...")

        }
          
      </td>

    </tr>
    <tr>
      
      <td><h5>P</h5></td>
      <td>{test.data? <h5>{test.data[4].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong>RECHAZO AL MANDO:</strong>  Permisividad si lo ejerce</p>
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[4].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[4].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >P</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>APETENCIA DE MANDO:</strong>  Le gusta ejercer responsabilidad, influencia y control sobre otros</p>
      </td>

    </tr>
    <tr>
      
     <td><h5>I</h5></td>
      <td>{test.data? <h5>{test.data[5].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>INDECISIÓN:</strong> Cauteloso en sus decisiones. No le gusta arriesgarse</p>
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[5].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[5].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >I</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>RESOLUCIÓN:</strong> Facilidad para la toma de decisiones. Rápida respuesta mental</p>
      </td>

    </tr>
    <tr>
      
      <td><h5>T</h5></td>
      <td>{test.data? <h5>{test.data[6].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong>LENTITUD:</strong> Ritmo pausado, relajado. No se apresura</p>
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[6].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[6].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >T</span>:null
        }
      </td>
      <td>  
      <p className="text-start"><strong>DINAMISMO:</strong> Ritmo de trabajo rápido. Tensiones internas</p>
      </td>
      <td class="align-middle" rowSpan="2">
        {
        (data.data ?
          <>
            <h5>{data.data[2].dimension}</h5>
            <h5>{data.data[2].promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {data.data[2].promedio>=3 && data.data[2].promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {data.data[2].promedio>=7 && data.data[2].promedio<=9?<span class="badge bg-success">Alto</span>:null}</h5>
            <h5>{data.data[2].promedio}</h5>
          </>            
          : "Cargando...")

        }
          
      </td>
    </tr>
    <tr>
      
      <td><h5>V</h5></td>
      <td>{test.data? <h5>{test.data[7].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>SENTABILIDAD:</strong> Laxitud en el plano físico</p>
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[7].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[7].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >V</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>VIGOR:</strong> Energía o interés para las actividades físicas. Actitud deportiva</p>
      </td>

    </tr>
    <tr>
      
      <td><h5>X</h5></td>
      <td>{test.data? <h5>{test.data[8].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>TIMIDEZ:</strong> Tiende a pasar desapercibido. No se vende a si mismo</p>
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[8].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[8].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >X</span>:null
        }
      </td>
      <td>
      <p className="text-start"><strong>EXHIBICIONISMO:</strong>  Le gusta atraer la atención. Busca reconocimiento, efectista, orgulloso</p>
      </td>
      <td class="align-middle" rowSpan="4">
        {
        (data.data ?
          <>
            <h5>{data.data[3].dimension}</h5>
            <h5>{data.data[3].promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {data.data[3].promedio>=3 && data.data[3].promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {data.data[3].promedio>=7 && data.data[3].promedio<=9?<span class="badge bg-success">Alto</span>:null}</h5>
            <h5>{data.data[3].promedio}</h5>
          </>            
          : "Cargando...")

        }
          
      </td>
    </tr>
    <tr>
      
      <td><h5>S</h5></td>
      <td>{test.data? <h5>{test.data[9].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>RESERVA:</strong> Escasos intrereses. Introvertido, serio, falto de tacto</p>
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[9].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[9].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >S</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>SOCIABILIDAD:</strong> Preocupado por las relaciones sociales. Expansivo y cordial</p>
      </td>

    </tr>
    <tr>
      
      <td><h5>B</h5></td>
      <td>{test.data? <h5>{test.data[10].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong>INDIVIDUALISMO: </strong> Independencia a las presiones del grupo. Tendencia al trabajo solitario</p>
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[10].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[10].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >B</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>ESPÍRITU DE EQUIPO:</strong> Sensible a los problemas de grupo. Dependiente del grupo</p>
      </td>
    </tr>
    <tr>
      
      <td><h5>O</h5></td>
      <td>{test.data? <h5>{test.data[11].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>FRIALDAD:</strong> Mantiene distancia afectiva coin los demás. Se mantiene objetivo, sin implicarse</p>
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[11].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[11].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >O</span>:null
        }
      </td>
      <td>
      <p className="text-start"><strong>AFECTIVIDAD:</strong> Le gusta sentirse implicado afectivamente. Vulnerabilidad afectiva</p>
      </td>
      
    </tr>
    <tr>
      
      <td><h5>R</h5></td>
      <td>{test.data? <h5>{test.data[12].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong>AFECTIVIDAD:</strong> Le gusta sentirse implicado afectivamente. Vulnerabilidad afectiva</p>
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[12].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[12].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >R</span>:null
        }
      </td> 
      <td>
      <p className="text-start"><strong>IRREFLEXIÓN:</strong> Dedica poco tiempo a las especulaciones teóricas. Prefiere actuar</p>
      </td>
      
      <td class="align-middle" rowSpan="3">
        {
        (data.data ?
          <>
            <h5>{data.data[4].dimension}</h5>
            <p>(Actitud laboral)</p>
            <h5>{data.data[4].promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {data.data[4].promedio>=3 && data.data[4].promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {data.data[4].promedio>=7 && data.data[4].promedio<=9?<span class="badge bg-success">Alto</span>:null}</h5>
            <h5>{data.data[4].promedio}</h5>
          </>            
          : "Cargando...")

        }
          
      </td>
    </tr>
    <tr>
      
      <td><h5>D</h5></td>
      <td>{test.data? <h5>{test.data[13].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong>GLOBALISMO: </strong> Desinterés por cuestiones de detalle</p>
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[13].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[13].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >D</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>DETALLISMO: </strong> Disfruta con los pequeños detalles. Se preocupa por la exactitud</p>
      </td>

    </tr>
    <tr>
      
      <td><h5>C</h5></td>
      <td>{test.data? <h5>{test.data[14].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>DESORDEN: </strong> Despreocupado por el orden. Tolera la confusión. "Cajón de desastre"</p>
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[14].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[14].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >C</span>:null
        }
      </td>
      <td>
      <p className="text-start"><strong>ORDEN (Externo):</strong>  Organizado. Rigidez. "Cada cosa en su sitio"</p>
      </td>
      
    </tr>
    <tr>
      
      <td><h5>Z</h5></td>
      <td>{test.data? <h5>{test.data[15].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>INNOVACIÓN:</strong> Interés e inquietud por lo nuevo. Busca la variedad</p>
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[15].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[15].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >Z</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>CONVERSADURISMO:</strong> Tolera la rutina. Resistencia al cambio y a nuevas formas o ideas</p>
      </td>
      <td class="align-middle" rowSpan="3">
        {
        (data.data ?
          <>
            <h5>{data.data[5].dimension}</h5>
            <p>(Control emocional)</p>
            <h5>{data.data[5].promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {data.data[5].promedio>=3 && data.data[5].promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {data.data[5].promedio>=7 && data.data[5].promedio<=9?<span class="badge bg-success">Alto</span>:null}</h5>
            <h5>{data.data[5].promedio}</h5>
          </>            
          : "Cargando...")

        }
          
      </td>
    </tr>
    <tr>
      
      <td><h5>E</h5></td>
      <td>{test.data? <h5>{test.data[16].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong> REACTIVIDAD EMOCIONAL:</strong> Humor variable. Se implica emocionalmente en el trabajo</p>
      
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[16].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[16].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >E</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>CONTROL:</strong> Emocionalmente comedido. No se altera con facilidad</p>
      </td>

    </tr>
    <tr>
      
      <td><h5>K</h5></td>
      <td>{test.data? <h5>{test.data[17].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>AGRESIVIDAD DEFENSIVA:</strong> Se defiende cuando se siente atacado. Afronta conflictos</p>
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[17].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[17].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >K</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>CONTEMPORIZACIÓN:</strong> No le gusta discutir. Evita los ataques personales</p>
      </td>
      
    </tr>
    <tr>
      
      <td><h5>F</h5></td>
      <td>{test.data? <h5>{test.data[18].respuesta}</h5>:"cargando"}</td>
      <td>
      <p className="text-start"><strong>RESISTENCIA A LA AUTORIDAD:</strong> No es dependiente de los superiores, ni busca su aprobación</p>
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[18].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[18].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >F</span>:null
        }
      </td>
      <td>
      <p className="text-start"><strong>FIDELIDAD:</strong> Lealtad y deferencia hacia los superiores. Interés en agradarles</p>
      </td>
      <td class="align-middle" rowSpan="2">
        {
        (data.data ?
          <>
            <h5>{data.data[6].dimension}</h5>
            <h5>{data.data[6].promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {data.data[6].promedio>=3 && data.data[6].promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {data.data[6].promedio>=7 && data.data[6].promedio<=9?<span class="badge bg-success">Alto</span>:null}</h5>
            <h5>{data.data[6].promedio}</h5>
          </>            
          : "Cargando...")

        }
          
      </td>
    </tr>
    <tr>
      
      <td><h5>W</h5></td>
      <td>{test.data? <h5>{test.data[19].respuesta}</h5>:"cargando"}</td>
      <td> 
      <p className="text-start"><strong>AUTONOMÍA:</strong> Le gusta hacer las cosas a su manera, de acuerdo con su iniciativa</p>
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===0?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===1?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===2?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===3?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===4?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===5?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
        <td className="align-middle">
        {test.data[19].respuesta===6?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===7?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===8?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td className="align-middle">
        {test.data[19].respuesta===9?
        <span className="badge bg-primary text-primary" style={{width:'20px',borderRadius:'50%',margin:'0'}} >W</span>:null
        }
      </td>
      <td> 
      <p className="text-start"><strong>FORMALISMO:</strong> Le gusta tener unas reglas bien definidas y atenderse a ellas</p>
      </td>

    </tr>

  </tbody>
              </table> 
              </div>
              <div className="col-lg-8 m-auto p-4">
            <Card sx={{ padding:'20px'}} elevation={4}>
                <Radar data={chartData} options={options} />

            </Card>
            
            </div>
             </>:
             <h3 className="fw-bold m-2">{error} ... </h3>
           }

{/*<table className="table table-bordered">
  <thead className="bg-light">
    <tr>
      <th scope="col">Promedio</th>
      <th scope="col">Dimensión</th>
    </tr>
  </thead>
  <tbody>
            {
                data.data?
                data.data.map((item,index)=>(
            <tr key={index}>
            <td>{item.promedio}</td>
            <td>{item.dimension}<br/>
            {item.promedio<3?<span class="badge bg-danger">Bajo</span>:null}
            {item.promedio>=3 && item.promedio<7?<span class="badge bg-warning">Normal</span>:null}
            {item.promedio>=7 && item.promedio<=9?<span class="badge bg-success">Alto</span>:null}</td>
            
		    </tr>
            )): "Cargando..."
            }
		
        </tbody>
          </table>*/}
            </Card>
            </Grid>
            
            
        </div>
    )
}

export default withRouter(Resultado)
