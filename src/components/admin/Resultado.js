import { Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import Header from '../Header'
import { Radar } from 'react-chartjs-2'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logo from '../img/RpaLatam.png'
import { ResultadoData } from '../user/ResultadoData'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Resultado = (props) => {
    const [data,setData]=useState([]);
    const [test,setTest]=useState([]);
    
    const [candidato, setCandidato] = useState([]);
    const [error,setError]=useState("");
    const [fecha,setFecha] = useState([])

    useEffect(()=>{
        Chart()
        getData()
        getTest()
        getCandidato()
        getJob()
        
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
        //console.log(test.date)
        for (const Obj of result.data) {
          //setSuma(Obj.respuesta)
          suma.push(Obj.respuesta)
          //factor.push(Obj.factor_id)
        }
        console.log(result.date)
        setFecha(result.date)
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
const [job,setJob]=useState([]);

    async function getJob(){
        let result= await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/job`)
        result = await result.json();
        if (result.code===1) {
            setJob(result.jobList)
        }
        
        
        
    }

    function getCargo(id){
      var cargo=""
      job.map(item => (
        item.id===id?
        cargo=item.office
        :
        null
      ))
      return cargo;
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
function promedio(numero){
  if (numero<3){
    return "BAJO"
  } else if (numero>=3 && numero<7){
    return "NORMAL"
  } else if (numero>=7 && numero<=9){
    return "ALTO"
  }
}

const print = () => {
  const doc = new jsPDF('l','px','a4')
  //doc.autoTable({ html: '#my-table' })
  doc.addImage(logo,'PNG',535,10,62,21)
  doc.setFont('helvetica','bold')
  doc.setFontSize(12);
  doc.text('INFORME DE RESULTADOS DE EVALUACIÓN DE COMPETENCIAS (PAPI KOSTICK)',135,45)
  
  doc.autoTable({
    startY:55,
    margin: {
    right: 150,
    left: 150
  },
  styles: {fontSize: 6},
    columnStyles: {
      0: {halign: 'center' ,cellWidth: 100},
      1: {halign: 'center' ,cellWidth: 50},
      2: {halign: 'center' },
      3: {halign: 'center' }
      // etc
    },
    headStyles: { halign: 'center',fillColor: [21, 101, 192] },
    head:[['Nombre','DNI','Cargo','Fecha/Hora de creación']],
    body:[[
      candidato.nombre,candidato.dni,getCargo(candidato.job_id),fecha.created_at?fecha.created_at.slice(0,19).replace('T',' '):null
    ]],
    theme:'grid'
  })
  doc.setFont('helvetica','normal')
  doc.setFontSize(8);
  doc.text('CUADRO DE DETALLE DE PERFIL ',264,90) 
  var color = {content:'',styles: {  fillColor: [21, 101, 192] }}
// Or use javascript directly:
doc.autoTable({
  //{margin: {top: 25, bottom: 15},
  startY:95,
  styles: {fontSize: 6},
  headStyles: { fillColor: [21, 101, 192] },
  //columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } },
  columnStyles: { 0: { halign: 'center' }},
  columnStyles: { 1: { halign: 'center' }},
  head: [['Factor', 'Suma', { content: 'Definición polo bajo', styles: {halign: 'center' }},'0','1','2','3','4','5','6','7','8','9', { content: 'Definicion polo alto', styles: {halign: 'center' }},'Fac. 2do orden']],
  body: [
    //['N',{ content: 'VERSATILIDAD: le gusta iniciar las cosas y que otras personas las terminen', colSpan: 2, styles: {  fillColor: [0, 255, 0] } },'','',{content:'',styles: {  fillColor: [21, 101, 192] }}],
    
    ['N',test.data[0].respuesta,'VERSATILIDAD: le gusta iniciar las cosas y que otras personas las terminen',test.data[0].respuesta===0?color:'',test.data[0].respuesta===1?color:'',test.data[0].respuesta===2?color:'',test.data[0].respuesta===3?color:'',test.data[0].respuesta===4?color:'',test.data[0].respuesta===5?color:'',test.data[0].respuesta===6?color:'',test.data[0].respuesta===7?color:'',test.data[0].respuesta===8?color:'',test.data[0].respuesta===9?color:'','PERSISTENCIA: Le gusta terminar personalmente todo aquello que comienza. Resistencia a delegar',{ content: data.data[0].dimension+'\n'+data.data[0].promedio+'\n'+promedio(data.data[0].promedio), rowSpan: 3}],
    ['G',test.data[1].respuesta,'ECONOMÍA DE ESFUERZO: Escasa identificación con el trabajo duro',test.data[1].respuesta===0?color:'',test.data[1].respuesta===1?color:'',test.data[1].respuesta===2?color:'',test.data[1].respuesta===3?color:'',test.data[1].respuesta===4?color:'',test.data[1].respuesta===5?color:'',test.data[1].respuesta===6?color:'',test.data[1].respuesta===7?color:'',test.data[1].respuesta===8?color:'',test.data[1].respuesta===9?color:'','INTENSIDAD ÉRGICA: Trabajador intenso, esforzado, laborioso'],
    ['A',test.data[2].respuesta,'CONFORMISMO: Se conforma con metas mediocres ambiciones realistas',test.data[2].respuesta===0?color:'',test.data[2].respuesta===1?color:'',test.data[2].respuesta===2?color:'',test.data[2].respuesta===3?color:'',test.data[2].respuesta===4?color:'',test.data[2].respuesta===5?color:'',test.data[2].respuesta===6?color:'',test.data[2].respuesta===7?color:'',test.data[2].respuesta===8?color:'',test.data[2].respuesta===9?color:'','AMBICIÓN DE LOGRO: Competitivo con tendencia a superarse a sí mismo y a los demás'],
    ['L',test.data[3].respuesta,'INSEGURIDAD DIRECTIVA: Sentimiento de inferioridad en cuanto a condiciones directivas',test.data[3].respuesta===0?color:'',test.data[3].respuesta===1?color:'',test.data[3].respuesta===2?color:'',test.data[3].respuesta===3?color:'',test.data[3].respuesta===4?color:'',test.data[3].respuesta===5?color:'',test.data[3].respuesta===6?color:'',test.data[3].respuesta===7?color:'',test.data[3].respuesta===8?color:'',test.data[3].respuesta===9?color:'','AUTOIMAGEN DE LÍDER: Confianza en sus condiciones de líder. Preocupado por el estatus',{ content: data.data[1].dimension+'\n'+data.data[1].promedio+'\n'+promedio(data.data[1].promedio), rowSpan: 3}],
    ['P',test.data[4].respuesta,'RECHAZO AL MANDO: Permisividad si lo ejerce',test.data[4].respuesta===0?color:'',test.data[4].respuesta===1?color:'',test.data[4].respuesta===2?color:'',test.data[4].respuesta===3?color:'',test.data[4].respuesta===4?color:'',test.data[4].respuesta===5?color:'',test.data[4].respuesta===6?color:'',test.data[4].respuesta===7?color:'',test.data[4].respuesta===8?color:'',test.data[4].respuesta===9?color:'','APETENCIA DE MANDO: Le gusta ejercer responsabilidad, influencia y control sobre otros',],
    ['I',test.data[5].respuesta,'INDECISIÓN: Cauteloso en sus decisiones. No le gusta arriesgarse',test.data[5].respuesta===0?color:'',test.data[5].respuesta===1?color:'',test.data[5].respuesta===2?color:'',test.data[5].respuesta===3?color:'',test.data[5].respuesta===4?color:'',test.data[5].respuesta===5?color:'',test.data[5].respuesta===6?color:'',test.data[5].respuesta===7?color:'',test.data[5].respuesta===8?color:'',test.data[5].respuesta===9?color:'','RESOLUCIÓN: Facilidad para la toma de decisiones. Rápida respuesta mental',],
    ['T',test.data[6].respuesta,'LENTITUD: Ritmo pausado, relajado. No se apresura',test.data[6].respuesta===0?color:'',test.data[6].respuesta===1?color:'',test.data[6].respuesta===2?color:'',test.data[6].respuesta===3?color:'',test.data[6].respuesta===4?color:'',test.data[6].respuesta===5?color:'',test.data[6].respuesta===6?color:'',test.data[6].respuesta===7?color:'',test.data[6].respuesta===8?color:'',test.data[6].respuesta===9?color:'','DINAMISMO: Ritmo de trabajo rápido. Tensiones internas',{ content: data.data[2].dimension+'\n'+data.data[2].promedio+'\n'+promedio(data.data[2].promedio), rowSpan: 2}],
    ['V',test.data[7].respuesta,'SENTABILIDAD: Laxitud en el plano físico',test.data[7].respuesta===0?color:'',test.data[7].respuesta===1?color:'',test.data[7].respuesta===2?color:'',test.data[7].respuesta===3?color:'',test.data[7].respuesta===4?color:'',test.data[7].respuesta===5?color:'',test.data[7].respuesta===6?color:'',test.data[7].respuesta===7?color:'',test.data[7].respuesta===8?color:'',test.data[7].respuesta===9?color:'','VIGOR: Energía o interés para las actividades físicas. Actitud deportiva',],
    ['X',test.data[8].respuesta,'TIMIDEZ: Tiende a pasar desapercibido. No se vende a si mismo',test.data[8].respuesta===0?color:'',test.data[8].respuesta===1?color:'',test.data[8].respuesta===2?color:'',test.data[8].respuesta===3?color:'',test.data[8].respuesta===4?color:'',test.data[8].respuesta===5?color:'',test.data[8].respuesta===6?color:'',test.data[8].respuesta===7?color:'',test.data[8].respuesta===8?color:'',test.data[8].respuesta===9?color:'','EXHIBICIONISMO: Le gusta atraer la atención. Busca reconocimiento, efectista, orgulloso',{ content: data.data[3].dimension+'\n'+data.data[3].promedio+'\n'+promedio(data.data[3].promedio), rowSpan: 4}],
    ['S',test.data[9].respuesta,'RESERVA: Escasos intrereses. Introvertido, serio, falto de tacto',test.data[9].respuesta===0?color:'',test.data[9].respuesta===1?color:'',test.data[9].respuesta===2?color:'',test.data[9].respuesta===3?color:'',test.data[9].respuesta===4?color:'',test.data[9].respuesta===5?color:'',test.data[9].respuesta===6?color:'',test.data[9].respuesta===7?color:'',test.data[9].respuesta===8?color:'',test.data[9].respuesta===9?color:'','SOCIABILIDAD: Preocupado por las relaciones sociales. Expansivo y cordial'],
    ['B',test.data[10].respuesta,'INDIVIDUALISMO: Independencia a las presiones del grupo. Tendencia al trabajo solitario',test.data[10].respuesta===0?color:'',test.data[10].respuesta===1?color:'',test.data[10].respuesta===2?color:'',test.data[10].respuesta===3?color:'',test.data[10].respuesta===4?color:'',test.data[10].respuesta===5?color:'',test.data[10].respuesta===6?color:'',test.data[10].respuesta===7?color:'',test.data[10].respuesta===8?color:'',test.data[10].respuesta===9?color:'','ESPÍRITU DE EQUIPO: Sensible a los problemas de grupo. Dependiente del grupo'],
    ['O',test.data[11].respuesta,'FRIALDAD: Mantiene distancia afectiva coin los demás. Se mantiene objetivo, sin implicarse',test.data[11].respuesta===0?color:'',test.data[11].respuesta===1?color:'',test.data[11].respuesta===2?color:'',test.data[11].respuesta===3?color:'',test.data[11].respuesta===4?color:'',test.data[11].respuesta===5?color:'',test.data[11].respuesta===6?color:'',test.data[11].respuesta===7?color:'',test.data[11].respuesta===8?color:'',test.data[11].respuesta===9?color:'','AFECTIVIDAD: Le gusta sentirse implicado afectivamente. Vulnerabilidad afectiva'],
    ['R',test.data[12].respuesta,'AFECTIVIDAD: Le gusta sentirse implicado afectivamente. Vulnerabilidad afectiva',test.data[12].respuesta===0?color:'',test.data[12].respuesta===1?color:'',test.data[12].respuesta===2?color:'',test.data[12].respuesta===3?color:'',test.data[12].respuesta===4?color:'',test.data[12].respuesta===5?color:'',test.data[12].respuesta===6?color:'',test.data[12].respuesta===7?color:'',test.data[12].respuesta===8?color:'',test.data[12].respuesta===9?color:'','IRREFLEXIÓN: Dedica poco tiempo a las especulaciones teóricas. Prefiere actuar',{ content: data.data[4].dimension+'\n'+data.data[4].promedio+'\n'+promedio(data.data[4].promedio), rowSpan: 3}],
    ['D',test.data[13].respuesta,'GLOBALISMO: Desinterés por cuestiones de detalle',test.data[13].respuesta===0?color:'',test.data[13].respuesta===1?color:'',test.data[13].respuesta===2?color:'',test.data[13].respuesta===3?color:'',test.data[13].respuesta===4?color:'',test.data[13].respuesta===5?color:'',test.data[13].respuesta===6?color:'',test.data[13].respuesta===7?color:'',test.data[13].respuesta===8?color:'',test.data[13].respuesta===9?color:'','DETALLISMO: Disfruta con los pequeños detalles. Se preocupa por la exactitud'],
    ['C',test.data[14].respuesta,'DESORDEN: Despreocupado por el orden. Tolera la confusión. "Cajón de desastre"',test.data[14].respuesta===0?color:'',test.data[14].respuesta===1?color:'',test.data[14].respuesta===2?color:'',test.data[14].respuesta===3?color:'',test.data[14].respuesta===4?color:'',test.data[14].respuesta===5?color:'',test.data[14].respuesta===6?color:'',test.data[14].respuesta===7?color:'',test.data[14].respuesta===8?color:'',test.data[14].respuesta===9?color:'','ORDEN (Externo): Organizado. Rigidez. "Cada cosa en su sitio"'],
    ['Z',test.data[15].respuesta,'INNOVACIÓN: Interés e inquietud por lo nuevo. Busca la variedad',test.data[15].respuesta===0?color:'',test.data[15].respuesta===1?color:'',test.data[15].respuesta===2?color:'',test.data[15].respuesta===3?color:'',test.data[15].respuesta===4?color:'',test.data[15].respuesta===5?color:'',test.data[15].respuesta===6?color:'',test.data[15].respuesta===7?color:'',test.data[15].respuesta===8?color:'',test.data[15].respuesta===9?color:'','CONVERSADURISMO: Tolera la rutina. Resistencia al cambio y a nuevas formas o ideas',{ content: data.data[5].dimension+'\n'+data.data[5].promedio+'\n'+promedio(data.data[5].promedio), rowSpan: 3}],
    ['E',test.data[16].respuesta,'REACTIVIDAD EMOCIONAL: Humor variable. Se implica emocionalmente en el trabajo',test.data[16].respuesta===0?color:'',test.data[16].respuesta===1?color:'',test.data[16].respuesta===2?color:'',test.data[16].respuesta===3?color:'',test.data[16].respuesta===4?color:'',test.data[16].respuesta===5?color:'',test.data[16].respuesta===6?color:'',test.data[16].respuesta===7?color:'',test.data[16].respuesta===8?color:'',test.data[16].respuesta===9?color:'','CONTROL: Emocionalmente comedido. No se altera con facilidad'],
    ['K',test.data[17].respuesta,'AGRESIVIDAD DEFENSIVA: Se defiende cuando se siente atacado. Afronta conflictos',test.data[17].respuesta===0?color:'',test.data[17].respuesta===1?color:'',test.data[17].respuesta===2?color:'',test.data[17].respuesta===3?color:'',test.data[17].respuesta===4?color:'',test.data[17].respuesta===5?color:'',test.data[17].respuesta===6?color:'',test.data[17].respuesta===7?color:'',test.data[17].respuesta===8?color:'',test.data[17].respuesta===9?color:'','CONTEMPORIZACIÓN: No le gusta discutir. Evita los ataques personales'],
    ['F',test.data[18].respuesta,'RESISTENCIA A LA AUTORIDAD: No es dependiente de los superiores, ni busca su aprobación',test.data[18].respuesta===0?color:'',test.data[18].respuesta===1?color:'',test.data[18].respuesta===2?color:'',test.data[18].respuesta===3?color:'',test.data[18].respuesta===4?color:'',test.data[18].respuesta===5?color:'',test.data[18].respuesta===6?color:'',test.data[18].respuesta===7?color:'',test.data[18].respuesta===8?color:'',test.data[18].respuesta===9?color:'','FIDELIDAD: Lealtad y deferencia hacia los superiores. Interés en agradarles',{ content: data.data[6].dimension+'\n'+data.data[6].promedio+'\n'+promedio(data.data[6].promedio), rowSpan: 2}],
    ['W',test.data[19].respuesta,'AUTONOMÍA: Le gusta hacer las cosas a su manera, de acuerdo con su iniciativa',test.data[19].respuesta===0?color:'',test.data[19].respuesta===1?color:'',test.data[19].respuesta===2?color:'',test.data[19].respuesta===3?color:'',test.data[19].respuesta===4?color:'',test.data[19].respuesta===5?color:'',test.data[19].respuesta===6?color:'',test.data[19].respuesta===7?color:'',test.data[19].respuesta===8?color:'',test.data[19].respuesta===9?color:'','FORMALISMO: Le gusta tener unas reglas bien definidas y atenderse a ellas'],

    // ...
  ],
  theme:'grid'
})
doc.addPage()
doc.addImage(logo,'PNG',535,10,62,21)
  doc.setFont('helvetica','bold')
  doc.setFontSize(12);
  doc.text('INTERPRETACIÓN DE RESULTADOS',235,45)
  doc.autoTable({
    startY:65,
    margin: {
    //right: 100,
    left: 60,
    right:60
  },
  styles: {fontSize: 8},
    columnStyles: {
      0: {halign: 'center' ,cellWidth: 100},
      1: {halign: 'center' ,cellWidth: 25},
      2: {halign: 'center' ,cellWidth: 30},
      // etc
    },
    headStyles: { halign: 'center',fillColor: [21, 101, 192] },
    head:[['Dimensión','Factor','Número','Resultado']],
    body:[
      [{ content: 'CAPACIDAD DE TRABAJO', rowSpan: 3, styles: { valign:'center' }},'N',test.data[0].respuesta,getResultado('N'+test.data[0].respuesta)],
      ['G',test.data[1].respuesta,getResultado('G'+test.data[1].respuesta)],
      ['A',test.data[2].respuesta,getResultado('A'+test.data[2].respuesta)],
      [{ content: 'LIDERAZGO', rowSpan: 3, styles: { valign:'center', fillColor: [213, 220, 228] }},{ content: 'L', styles: { fillColor: [213, 220, 228] }},{ content: test.data[3].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('L'+test.data[3].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'P', styles: { fillColor: [213, 220, 228] }},{ content: test.data[4].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('P'+test.data[4].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'I', styles: { fillColor: [213, 220, 228] }},{ content: test.data[5].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('I'+test.data[5].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'ACTIVIDAD / DINAMISMO', rowSpan: 2, styles: { valign:'center' }},'T',test.data[6].respuesta,getResultado('T'+test.data[6].respuesta)],
      ['V',test.data[7].respuesta,getResultado('V'+test.data[7].respuesta)],
      [{ content: 'SOCIABILIDAD', rowSpan: 4, styles: { valign:'center', fillColor: [213, 220, 228] }},{ content: 'X', styles: { fillColor: [213, 220, 228] }},{ content: test.data[8].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('X'+test.data[8].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'S', styles: { fillColor: [213, 220, 228] }},{ content: test.data[9].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('S'+test.data[9].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'B', styles: { fillColor: [213, 220, 228] }},{ content: test.data[10].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('B'+test.data[10].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'O', styles: { fillColor: [213, 220, 228] }},{ content: test.data[11].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('O'+test.data[11].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'ESTILO DE TRABAJO', rowSpan: 3, styles: { valign:'center' }},'R',test.data[12].respuesta,getResultado('R'+test.data[12].respuesta)],
      ['D',test.data[13].respuesta,getResultado('D'+test.data[13].respuesta)],
      ['C',test.data[14].respuesta,getResultado('C'+test.data[14].respuesta)],
      [{ content: 'TEMPERAMENTO', rowSpan: 3, styles: { valign:'center', fillColor: [213, 220, 228] }},{ content: 'Z', styles: { fillColor: [213, 220, 228] }},{ content: test.data[15].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('Z'+test.data[15].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'E', styles: { fillColor: [213, 220, 228] }},{ content: test.data[16].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('E'+test.data[16].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'K', styles: { fillColor: [213, 220, 228] }},{ content: test.data[17].respuesta, styles: { fillColor: [213, 220, 228] }},{ content: getResultado('K'+test.data[17].respuesta), styles: { fillColor: [213, 220, 228] }}],
      [{ content: 'SUBORDINACIÓN', rowSpan: 3, styles: { valign:'center' }},'F',test.data[18].respuesta,getResultado('F'+test.data[18].respuesta)],
      ['W',test.data[19].respuesta,getResultado('W'+test.data[19].respuesta)]   

    ],
    theme:'grid'
  })


doc.save('Informe_Resultado_'+candidato.nombre+'.pdf')

};

function getResultado(codigo){
  var res = ""
  //ResultadoData.codigo===codigo?
  //res=ResultadoData.resultado:
  //res="No hay resultado"
  ResultadoData.map((data)=>(
    codigo===data.codigo?
    res=data.resultado:
    null
  ))
//console.log(ResultadoData)
  //return ResultadoData[0].codigo;
  return res;
}

    return (
        <div>
             <Header/><br/><br/>
            <Grid xs={12} md={10} style={{ minHeight: '100vh', margin:'auto',}} item  >
            <Card sx={{ padding:'20px'}} elevation={4}>
            <Typography style={{fontWeight: 'bold'}} variant="h4" color="primary" gutterBottom margin={1}>
            {data.message}
            </Typography>
            
            
            <button className="btn btn-block text-white mb-2" style={{backgroundColor:'#23498D', float:'right', fontWeight: 'bold'}} onClick={print} ><PictureAsPdfIcon/> DESCARGAR RESULTADO</button>
            
            
              
            
            
          
            
          
          <div className="card col-12" >
          <div className="card-body" style={{backgroundColor:'#23498D'}}>
          <div className="d-flex justify-content-around">
              <div><h5 className="text-white">Candidato: {candidato.nombre}</h5></div>
              <div><h5 className="text-white">DNI: {candidato.dni}</h5></div>
              <div><h5 className="text-white">Cargo: {
                    job.map((item,index)=>(
                      candidato.job_id===item.id?
                      item.office:
                      null
                    ))
                }</h5></div>
            <div><h5 className="text-white">Fecha-Hora: {fecha.created_at?fecha.created_at.slice(0,19).replace('T',' '):null}</h5></div>
          </div>
          
          
          
          
          
          
          </div>
          </div>
           {
             data.code===1 && test.code===1?
             <>
             <div className="table-responsive" id="content" >
             <table className="table table-sm table-bordered">
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
      <p className="text-start"><strong>VERSATILIDAD:</strong> Le gusta iniciar las cosas y que otras personas las terminen</p>
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
              <div className="col-lg-8 m-auto p-4" id="radar">
            <Card sx={{ padding:'20px'}} elevation={4}>
                <Radar data={chartData} options={options} />

            </Card>
            
            </div><br/>
            <Typography style={{fontWeight: 'bold'}} variant="h4" color="primary" gutterBottom margin={4}>
            INTERPRETACIÓN DE RESULTADOS
            </Typography><br/>
            <table className="table table-bordered">
              <thead className="bg-light">
              <tr>
              <th scope="col">Dimensión</th>
              <th scope="col">Factor</th>
              <th scope="col">Número</th>
              <th scope="col">Resultado</th>
              </tr>
              </thead>
              <tbody>
              <tr>
              <th className="align-middle" rowSpan="3">CAPACIDAD DE TRABAJO</th>
              <td>N</td>
              <td>{test.data[0].respuesta}</td>
              <td>{getResultado('N'+test.data[0].respuesta)}</td>
              </tr>
              <tr>
              <td>G</td>
              <td>{test.data[1].respuesta}</td>
              <td>{getResultado('G'+test.data[1].respuesta)}</td>
              </tr>
              <tr>
              <td>A</td>
              <td>{test.data[2].respuesta}</td>
              <td>{getResultado('A'+test.data[2].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <th className="align-middle" rowSpan="3">LIDERAZGO</th>
              <td>L</td>
              <td>{test.data[3].respuesta}</td>
              <td>{getResultado('L'+test.data[3].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <td>P</td>
              <td>{test.data[4].respuesta}</td>
              <td>{getResultado('P'+test.data[4].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <td>I</td>
              <td>{test.data[5].respuesta}</td>
              <td>{getResultado('I'+test.data[5].respuesta)}</td>
              </tr>
              <tr>
              <th className="align-middle" rowSpan="2">ACTIVIDAD / DINAMISMO</th>
              <td>T</td>
              <td>{test.data[6].respuesta}</td>
              <td>{getResultado('T'+test.data[6].respuesta)}</td>
              </tr>
              <tr>
              <td>V</td>
              <td>{test.data[7].respuesta}</td>
              <td>{getResultado('V'+test.data[7].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <th className="align-middle" rowSpan="4">SOCIABILIDAD</th>
              <td>X</td>
              <td>{test.data[8].respuesta}</td>
              <td>{getResultado('X'+test.data[8].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <td>S</td>
              <td>{test.data[9].respuesta}</td>
              <td>{getResultado('S'+test.data[9].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <td>B</td>
              <td>{test.data[10].respuesta}</td>
              <td>{getResultado('B'+test.data[10].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <td>O</td>
              <td>{test.data[11].respuesta}</td>
              <td>{getResultado('O'+test.data[11].respuesta)}</td>
              </tr>
              <tr>
              <th className="align-middle" rowSpan="3">ESTILO DE TRABAJO</th>
              <td>R</td>
              <td>{test.data[12].respuesta}</td>
              <td>{getResultado('R'+test.data[12].respuesta)}</td>
              </tr>
              <tr>
              <td>D</td>
              <td>{test.data[13].respuesta}</td>
              <td>{getResultado('D'+test.data[13].respuesta)}</td>
              </tr>
              <tr>
              <td>C</td>
              <td>{test.data[14].respuesta}</td>
              <td>{getResultado('C'+test.data[14].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <th className="align-middle" rowSpan="3">TEMPERAMENTO</th>
              <td>Z</td>
              <td>{test.data[15].respuesta}</td>
              <td>{getResultado('Z'+test.data[15].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <td>E</td>
              <td>{test.data[16].respuesta}</td>
              <td>{getResultado('E'+test.data[16].respuesta)}</td>
              </tr>
              <tr className="bg-light">
              <td>K</td>
              <td>{test.data[17].respuesta}</td>
              <td>{getResultado('K'+test.data[17].respuesta)}</td>
              </tr>
              <tr>
              <th className="align-middle" rowSpan="2">SUBORDINACIÓN</th>
              <td>F</td>
              <td>{test.data[18].respuesta}</td>
              <td>{getResultado('F'+test.data[18].respuesta)}</td>
              </tr>
              <tr>
              <td>W</td>
              <td>{test.data[19].respuesta}</td>
              <td>{getResultado('W'+test.data[19].respuesta)}</td>
              </tr>

              
              </tbody>
            </table>
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
