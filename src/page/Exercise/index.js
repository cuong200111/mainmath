import { Box, Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { apiKeys } from '../../config/api'

const Exercise = () => {
  //call api
  const [exprs, setExprs] = useState([])
  const params = new URLSearchParams(window.location.search)
  //IB
  console.log(exprs);
  const IB = params.get('IB')
  //Topic
  const title = params.get('title')
  //name Topic
  const id = params.get('id')
  const [fillExprs, setFillExprs] = useState([{ content: "data rong" }])
  const [popup,setpopup] = useState('')
  useEffect(() => {
    async function filExercise() {
      const fillExer = await axios.get(`${apiKeys}/getExercise`)
      const exerciseMap = await axios.get(`${apiKeys}/getExercise/${IB}/${title}/${id}`)
      setExprs(exerciseMap.data)
      setFillExprs(fillExer.data.exercise[IB][title].filter(item => item.title === id))
    }

    filExercise()
    return () => {
      return 0
    }
  }, [IB, title, id])
  const [activ, setactiv] = useState(-1)
  const activePopup = useRef(null)
  const bg_exercise = useRef(null)
  useEffect(() => {
    document.addEventListener('click',(e)=>{
      if(activePopup.current && !activePopup.current.contains(e.target)){
        setactiv(-1)
        activePopup.current.classList.remove('active')
        bg_exercise.current.classList.remove('active')
      }
    },true)
    if(activ>-1){
      bg_exercise.current.classList.add('active')
    }


  }, [activ,popup])
  const handleMark = (e,i) => {
    setpopup(e)
    setactiv(i)
  }
  const handleFormula = (e,i) => {
    setpopup(e)
    setactiv(i)
  }
  return (
    <div style={{ height: "auto" }}>
      <div ref={bg_exercise} style={{position:'fixed',width:"100%",height:"100%",background:"#0000001f",top:"0",left:"0",zIndex:"1"}} className='bg_exercise'></div>
      <Box>
        <Grid><h1>
          {id}
        </h1>
          <div style={{wordBreak:"break-word",padding:"0px 12px"}}>{id ? fillExprs && fillExprs[0].content : 'data rong'}</div>
        </Grid>


       <Grid className='exerciseContainer_main'>
       {exprs && exprs.map((item, index) => (
          <Grid key={index} className='exerciseContainer'>


            <Grid className='exerciseContainer_left'>
              <Grid className='exerciseContainer_left_top'>
                Question {item.id}
              </Grid>
              <Grid className='exerciseContainer_left_bottom'>
                <img src={item.question} />
              </Grid>
            </Grid>

            <Grid className='exerciseContainer_right'>
              <Grid className='exerciseContainer_right_top'>
                <Button onClick={() => { handleMark(item.mark,index) }} variant='outlined' color='secondary' size='large' style={{ width: "150px" }}>
                  mark
                </Button>

              </Grid>
              <Grid className='exerciseContainer_right_bottom'>
                <Button onClick={() => { handleFormula(item.formula,index) }} variant='outlined' color='secondary' size='large' style={{ width: "150px" }}>
                  formula
                </Button>

              </Grid>
            </Grid>

            <div ref={activePopup} className={`exerciseContainer_popup ${activ ===index?'active':''}`}>
              <img src={popup} />
            </div>

          </Grid>
        ))}
       </Grid>





      </Box>



    </div>
  )
}

export default Exercise