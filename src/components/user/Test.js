import { Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Modal, Typography } from '@mui/material'
import React, { useEffect, useRef ,useState} from 'react'
import { useHistory } from 'react-router'
import Header from '../Header'
import { TestData } from './TestData'
//import Alert from '@mui/material/Alert';
import { Box, typography } from '@mui/system'
//import { ContactlessOutlined } from '@mui/icons-material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import imgFin from '../img/RPA-1.jpg'

const Test = () => {

    const user= JSON.parse(localStorage.getItem("user-info"));


    const [currentQuestion1, setCurrentQuestion1] = useState(0)
    const [currentQuestion2, setCurrentQuestion2] = useState(1)
    const [currentQuestion3, setCurrentQuestion3] = useState(2)

    const[error,setError]=useState('')
    
    const handleAnswerButtonClick=()=>{
       // console.log(Object.values(answer).length)

        for (let index = 0; index < currentQuestion3; index++) {
            if (currentQuestion3===(Object.values(answer).length-1)) {
                const nextQuestion1=currentQuestion1+3
                const nextQuestion2=currentQuestion2+3
                const nextQuestion3=currentQuestion3+3

                setCurrentQuestion1(nextQuestion1)
                setCurrentQuestion2(nextQuestion2)
                setCurrentQuestion3(nextQuestion3)

                clearSelection(currentQuestion1+1)
                clearSelection(currentQuestion2+1)
                clearSelection(currentQuestion3+1)
                setError("")
            } else{
                //console.log("mal")
                setError("Debe seleccionar todas las preguntas para continuar")
            }
            
            
        }
        
        
        
        //console.log(answer)
        //console.log(error)
    }

    const [answer, setAnswer] = useState({})

    const handleInput = (event) => {
        const { value, name } = event.target;
        setAnswer({
            ...answer,
            [name]:value
        });
    };
    const [data, setData] = useState({
        
        
    })

 
    
    //const arreglo=answer.sort();
    let items=[];
    const repetidos=[];
    let contador=1;
    function comparar(a, b) {
        return a - b;
      }

    let conversion=[];

    

    const handleAddItems =()=>{
        //Object.entries(answer.sort(comparar));
        conversion=(Object.values(answer))
        console.log(conversion)
        conversion.sort(comparar)

        for (let index = 0; index <conversion.length; index++) {
            if(conversion[index+1]===conversion[index]){
                contador++;
            }else{

                items.push({countFactor:contador,factor_id:conversion[index]})
                //repetidos.push(contador)
                contador=1
                
            }
            
        } 
        
        setData({
            ...data,
                    items,
                    user_id: user.data.id
                
            
        })
       
        //console.log(arreglo)
        //console.log(resultado)
        //console.log(repetidos) 
        //console.log(data) 
    }

    const clearSelection= (name)=>{
        const radioBtns = document.querySelectorAll(
            "input[type='radio'][name='"+name+"']"
        );
        radioBtns.forEach((radioBtn)=>{
            if(radioBtn.checked===true) radioBtn.checked=false;
        })
    }

    const history=useHistory();
    async function saveTest(){
        //handleAddItems();
        //console.warn("data",email,password)
        //let item={email,password}
        //http://localhost:8000
        let result = await fetch(`https://endpoints-test-papikostick.herokuapp.com/dev/test`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        });
        result = await result.json();
        if (result.code===0) {
            setError(result.message)
        } else {
            localStorage.clear();
            history.push('/')
           // history.push("/end")
        }
        
    }

    function logout(){
        localStorage.clear();
        history.push('/')
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        //bgcolor: '#B4C7E7',
        bgcolor: 'white',
        //border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const styleFin = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        bgcolor: '#B4C7E7',
        //border: '2px solid #000',
        boxShadow: 24,
        //p: 4,
      };
    
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const [openInicio, setOpenInicio] = React.useState(true);
      const handleCloseInicio = () => setOpenInicio(false);
      
      const [habilitar, setHabilitar] = useState(true);

    return (
        <div>
        <Header/><br/><br/>
        <Grid  style={{ minHeight: '100vh' }} xs={11} xl={4} style={{ minHeight: '100vh', margin:'auto',}} item>
        <Card sx={{ minWidth: 275 , padding:'20px'}} elevation={4}>
        <h2 className="fw-bold" style={{color:'#23498D'}}>
        TEST PAPI KOSTICK
        </h2>
        <Typography component="div"  variant="h5" color="primary" fontWeight="bold">
        <Box sx={{ textAlign: 'right', m: 1 }}>{currentQuestion3+1+"/"+TestData.length}</Box>
        </Typography>
        <div style={{ backgroundColor:'#4593DE',textAlign: 'left', padding:20, marginBottom:5}} >
        <Box sx={{ textAlign: 'left', m: 1}}>
        <Typography variant="h5" fontWeight="bold">{TestData[currentQuestion1].questionText}</Typography>
        </Box >
        
        {
            TestData[currentQuestion1].answerOptions.map((answerOption)=>(
                
                <div class="form-check m-2" >  
                <input class="form-check-input" type="radio" value={answerOption.factor_id} name={TestData[currentQuestion1].id} onChange={handleInput}/>
                
                    <label class="form-check-label">{answerOption.answerText}</label>
                </div>
                
                
                
                            ))
        }
        </div>
        <div style={{ backgroundColor:'#B4C7E7',textAlign: 'left', padding:20, marginBottom:5}} >
        <Box sx={{ textAlign: 'left', m: 1 }}>
        <Typography variant="h5" fontWeight="bold">{TestData[currentQuestion2].questionText}</Typography>
        </Box>
        
        {
            TestData[currentQuestion2].answerOptions.map((answerOption)=>(
                <div class="form-check m-2" >  
                <input class="form-check-input" type="radio" value={answerOption.factor_id} name={TestData[currentQuestion2].id} onChange={handleInput}/>
                
                    <label class="form-check-label">{answerOption.answerText}</label>
                </div>
                            ))
        }
</div>
<div style={{ backgroundColor:'#DAE3F3',textAlign: 'left', padding:20, marginBottom:5}} >
<Box sx={{ textAlign: 'left', m: 1 }}>
        <Typography variant="h5" fontWeight="bold">{TestData[currentQuestion3].questionText}</Typography>
        </Box>
        
        {
            TestData[currentQuestion3].answerOptions.map((answerOption)=>(
                <div class="form-check m-2" >  
                <input class="form-check-input" type="radio" value={answerOption.factor_id} name={TestData[currentQuestion3].id} onChange={handleInput}/>
                
                    <label class="form-check-label">{answerOption.answerText}</label>
                </div>
                            ))
        }
       </div> 
        {
            currentQuestion3<3?
            <>
           
            <Box
            component="div"
            m={1} //margin
            style={{display: "flex",justifyContent: "flex-end",
            alignItems: "flex-end"}}
            >
            <button  className="btn btn-block text-white" onClick={handleAnswerButtonClick} style={{margin:10,backgroundColor:'#23498D'}} >Siguiente</button >
            </Box>  
            </>:
            null

        }
        {
            currentQuestion3>=3 && currentQuestion3<89?
            <>
            <Box
            component="div"
            m={1} //margin
            style={{display: "flex",justifyContent: "flex-end",
            alignItems: "flex-end"}}
            >
             <button  className="btn btn-block text-white" onClick={handleAnswerButtonClick} style={{margin:10,backgroundColor:'#23498D'}} >Siguiente</button >
            </Box> 
            </>:
            null

        }
        {
            currentQuestion3===89?
            <>
            <Box
            component="div"
            m={1} //margin
            style={{display: "flex",justifyContent: "flex-end",
            alignItems: "flex-end"}}
            >
                <button className="btn btn-block text-white"  
                style={{margin:10,backgroundColor:'#23498D'}}
                onClick={()=>{
                 handleOpen()
                 handleAddItems()}}>Siguiente</button>
            </Box> 
             
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleFin}>
            
            <img src={imgFin} style={{width:'100%', margin:0,padding:0}}/>
            <Typography id="modal-modal-title" variant="h5"  sx={{ textAlign:'center',mt: 2 }} fontWeight="bold">
          ¡Felicitaciones! 
          </Typography>
          <Typography variant="h6" sx={{ textAlign:'center',mt: 2 }}>
          Culminaste la prueba, esperamos que tengas muchos éxitos en este proceso de evaluación con RPA Latam.
          </Typography>
          <Box
            component="div"
            m={1} //margin
            style={{display: "flex",justifyContent: "flex-end",
            alignItems: "flex-end"}}
            >
            <button className="btn btn-block btn-lg text-white"  onClick={()=>{
                handleClose();
                saveTest()}} 
                style={{margin:10, backgroundColor:'#23498D'} } >Enviar test</button >
            </Box> 
            
         
        </Box>
      </Modal>
            
            </>:
            null

        }
        {
            error?
            <>
            <div className="alert alert-danger d-flex align-items-center m-auto" role="alert">
                <div>
                <ErrorOutlineIcon/> {error}
                </div>
                </div>    
            </>:
            null
        }
        
        </Card>
        </Grid>
        


     
     <Modal
        open={openInicio}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
          ¡Hola {user.data.nombre}, te damos la bienvenida a la plataforma de evaluación!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p>
              Siguiendo con el proceso de evaluación de RPA Latam, es importante para nosotros el desarrollo de la 
              siguiente prueba de personalidad.
              </p>
              <p>
              Los datos se utilizarán única y exclusivamente para las finalidades del proceso de reclutamiento 
              y evaluación de RPA Latam.
              </p>
              <p>
              Te recordamos desarrollarlo lo más pronto posible para que puedas tener mejores resultados en el 
              proceso de evaluación.
              </p>

            
            <div class="alert alert-primary" role="alert">
            <p>
            <strong>Indicaciones Iniciales:</strong><br/>

            - Solo hay una posibilidad para culminar la prueba (Un intento).<br/>
 
            - La prueba consta de 90 pares de frases.<br/>

            - Debe elegir una opción de cada par de frases con el cual te sientas más identificado.<br/>

            - Si alguna de las frases no te identifica, o es su defecto te identifican ambas, solo debe optar por una opción.<br/>

            - Debe contestar de forma natural y honestamente.<br/>

            - No hay límites de tiempo para culminar la prueba.<br/>
            </p>

            <p>
            <strong>Recomendaciones Iniciales:</strong><br/>

            - Busca un lugar tranquilo y sin interrupciones para desarrollar la prueba   .   
            </p>

            </div>
            <FormGroup>
        <FormControlLabel control={<Checkbox
        onChange={() => setHabilitar(!habilitar)}
        />} label="Estoy de acuerdo y acepto las condiciones de la prueba." />
    </FormGroup>
            

          </Typography>

          <Box
            component="div"
            m={1} //margin
            style={{display: "flex",justifyContent: "flex-end",
            alignItems: "flex-end"}}
            >
            <button  className="btn btn-block" onClick={handleCloseInicio} style={{margin:10,backgroundColor:'#23498D',color:'#fff'} } disabled={habilitar}>Empezar</button >
            </Box> 
        </Box>
      </Modal>  
      

        </div>
    )
}

export default Test
