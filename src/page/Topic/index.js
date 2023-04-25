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
  const level = [
    { name: "Easy" },
    { name: "Medium" },
    { name: "Hard" }
  ]
  const topics = [
    { name: "Topic" },
    { name: "Exam" },

  ]
  return (
    <div className='Topics'>
      <Grid container className='Topics_top'>
        <h1>Topics</h1>
      </Grid>
      <Grid container className='Topics_between'>
        <Box className='Topics_between_box1'>
          <Grid className='Topics_between_box1_top'>
            <span>Difficulty</span>
          </Grid>
          <Grid className='Topics_between_box1_bottom' container style={{ padding: "30px 0px" }}>
            {level.map((item, index) => (<div className='Topics_between_box1_bottom_content' style={{ margin: "0px 20px 0 0px" }} key={index}>{item.name}</div>))}
          </Grid>
        </Box>
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
      </Grid>
    </div>
  )
}
export default {
  TopicParam,
  Topic
}