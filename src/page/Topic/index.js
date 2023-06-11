<<<<<<< HEAD
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BreadCrumb from '../../components/brekCrumb'
import { Box, Grid } from '@mui/material'
import levelContainer from '../../data/levelContainer.json'
const TopicParam = () => {
  const useParam = new URLSearchParams(window.location.search)


  return (
    <div>


      <div style={{ display: "none", visibility: "hidden" }}>

      </div>
    </div>
  )
}
const Topic = () => {
  const useParam = new URLSearchParams(window.location.search)
const [levelcontai,setLevel] = useState(['Easy','Hard'])
const fillLevel =  levelContainer.map((item)=>{
  return levelcontai.filter(level=>{
      return item.level  === level
  })

})
console.log(fillLevel)
=======
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BreadCrumb from '../../components/brekCrumb'
import { Box, Grid } from '@mui/material'
import axios from 'axios'
import { apiKeys } from '../../config/api'


const TopicParam = (props) => {

  const IB = useParams().id.replace(/\s/g, "_")
  const useParam = new URLSearchParams(window.location.search)
  const titleParam = useParam.get('title')

  const navigate = useNavigate()
  //callApi
  const [exprs, setExprs] = useState([])

  const [expr, setExpr] = useState(false)
  useEffect(() => {
    async function exercise() {
      const dataExercise = await axios.get(`${apiKeys}/getExercise`)
      setExpr(dataExercise.data.exercise[IB][titleParam])
    }
    exercise()
    return () => {
      return 0
    }
  }, [IB, titleParam])

  const [levelcontai, setLevel] = useState(['Easy', 'Hard'])
  const [topicParam, setTopicParam] = useState(titleParam)


  useEffect(() => {
    // const fillLevel = expr.filter((item) => {
    //   if (levelcontai.includes(item.level)) {
    //     return item
    //   }
    // })
  }, [levelcontai])

  // const difficulty = ['Easy', 'Hard'];
  // const output = [];

  // for (let i = 0; i < lessons.length; i++) {
  //   if (difficulty.includes(lessons[i].level)) {
  //     output.push(lessons[i]);
  //   }
  // }

  const level = [
    { name: "Easy" },
    { name: "Medium" },
    { name: "Hard" }
  ]
  const topics = [
    { name: "Topic" },
    { name: "Exam" }

  ]
  const indexTopic = titleParam === 'Exam' ? 1 : titleParam === 'Topic' ? 0 : 2
  // /Topic/${itemb.title.content}?title=${topic}` : '#'}`

  return (
    <div className='Topics'>
      <Grid container className='Topics_top'>
        <h1 style={{fontSize:"28px"}}>Topics</h1>
      </Grid>
      <Grid container className='Topics_between'>
        {/* <Box className='Topics_between_box1'>
        <Grid className='Topics_between_box1_top'>
          <span>Difficulty</span>
        </Grid>
        <Grid className='Topics_between_box1_bottom' container style={{ padding: "30px 0px" }}>
          {level.map((item, index) => (<div className='Topics_between_box1_bottom_content' style={{ margin: "0px 20px 0 0px" }} key={index}>{item.name}</div>))}
        </Grid>
      </Box> */}
        <Box className='Topics_between_box2'>
          <Grid className='Topics_between_box2_top'>
            <span >Choose one</span>
          </Grid>
          <Grid className='Topics_between_box2_bottom'>
            <Grid className='Topics_between_box1_bottom' container style={{ padding: "30px 0px" }}>
              {topics.map((item, index) => (<Link to={`/Topic/${IB}?title=${item.name}`} className='Topics_between_box1_bottom_content' style={{ margin: "0px 20px 0 0px", backgroundColor:  indexTopic === index ? '#155f75' :  '', color: indexTopic === index ? 'white':'black' }} key={index}>{item.name}</Link>))}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid container justifyContent="space-between" className='Topics_bottom'>
        <Box className='Topics_bottom_Box'>
          <Grid className='Topics_bottom_Box_Content' container  >
            {expr ? expr.map((item, index) => (
              <Grid key={index} item xs={2} onClick={() => {
                navigate(`/exercise?IB=${IB}&title=${titleParam}&id=${item.title}`)
              }} className='Topics_bottom_Box_Content_items'>
                <h1>
                  {item.title.slice(0, 10)}...
                </h1>
                <span className='test'>
                  {item.content.slice(0, 200)}...
                </span>
              </Grid>
            )) : null}

          </Grid>
        </Box>

      </Grid>
    </div>
  )
}

// Topic 2 ==========================================================================================
const Topic = () => {
  // const IB = useParams().id.replace(/\s/g, "_")
  const IB = 'IB Math AA SL'
  const useParam = new URLSearchParams(window.location.search)
  const titleParam = useParam.get('title')
  const [levelcontai, setLevel] = useState(['Easy', 'Hard'])
  const navigate = useNavigate()
  //callApi
  const [exprs, setExprs] = useState([])

  useEffect(() => {
    async function exercise() {
      const dataExercise = await axios.get(`${apiKeys}/getExercise`)

      setExprs(dataExercise.data.exercise)
    }
    exercise()
    return () => {
      return 0
    }
  }, [])
  const expr = exprs.length > 0 ? exprs[IB][titleParam] : false

  useEffect(() => {
    // const fillLevel = expr.filter((item) => {
    //   if (levelcontai.includes(item.level)) {
    //     return item
    //   }
    // })
  }, [])

  // const difficulty = ['Easy', 'Hard'];
  // const output = [];

  // for (let i = 0; i < lessons.length; i++) {
  //   if (difficulty.includes(lessons[i].level)) {
  //     output.push(lessons[i]);
  //   }
  // }

>>>>>>> mainmathnew
  const level = [
    { name: "Easy" },
    { name: "Medium" },
    { name: "Hard" }
  ]
  const topics = [
    { name: "Topic" },
    { name: "Exam" },
<<<<<<< HEAD

  ]
=======
  ]

>>>>>>> mainmathnew
  return (
    <div className='Topics'>
      <Grid container className='Topics_top'>
        <h1>Topics</h1>
      </Grid>
      <Grid container className='Topics_between'>
<<<<<<< HEAD
        <Box className='Topics_between_box1'>
=======
        {/* <Box className='Topics_between_box1'>
>>>>>>> mainmathnew
          <Grid className='Topics_between_box1_top'>
            <span>Difficulty</span>
          </Grid>
          <Grid className='Topics_between_box1_bottom' container style={{ padding: "30px 0px" }}>
            {level.map((item, index) => (<div className='Topics_between_box1_bottom_content' style={{ margin: "0px 20px 0 0px" }} key={index}>{item.name}</div>))}
          </Grid>
<<<<<<< HEAD
        </Box>
=======
        </Box> */}
>>>>>>> mainmathnew
        <Box className='Topics_between_box2'>
          <Grid className='Topics_between_box2_top'>
            <span>Choose one</span>
          </Grid>
          <Grid className='Topics_between_box2_bottom'>
            <Grid className='Topics_between_box1_bottom' container style={{ padding: "30px 0px" }}>
              {topics.map((item, index) => (<div className='Topics_between_box1_bottom_content' style={{ margin: "0px 20px 0 0px" }} key={index}>{item.name}</div>))}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid container justifyContent="space-between" className='Topics_bottom'>
<<<<<<< HEAD
        <Grid className='Topics_bottom_left'>
          <Grid className='Topics_bottom_left_item'>
            <Grid className='Topics_bottom_left_item_title'>
s
            </Grid>
            <Grid className='Topics_bottom_left_item_content'>
s
            </Grid>
          </Grid>
        </Grid>
        <Grid className='Topics_bottom_right'>
s
        </Grid>
=======
        <Box className='Topics_bottom_Box'>
          <Grid className='Topics_bottom_Box_Content' container item xs={12} >
            {expr ? expr.map((item, index) => (<div key={index}>
              <Grid onClick={() => {
                navigate('/exercise')
              }} item xs={4} className='Topics_bottom_Box_Content_items'>
                <h1>
                  {item.title.slice(0, 10)}...
                </h1>
                <div>
                  {item.content.slice(0, 70)}...
                </div>
              </Grid>
            </div>)) : null}

          </Grid>
        </Box>

>>>>>>> mainmathnew
      </Grid>
    </div>
  )
}
export default {
  TopicParam,
  Topic
}