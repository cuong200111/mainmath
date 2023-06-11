import React, {  } from 'react'
import {useLocation, useNavigate } from 'react-router-dom'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const BreadCrumb = (props) => {
  const id = props
  const location = useLocation()
  const navigate = useNavigate()

  const arrLocation = location.pathname.split('/').map((item) => {
    return item.replace(/%20/g, " ")
  })
  const indexArr = arrLocation.indexOf('Topic')
  if (indexArr > -1) {
    arrLocation.splice(indexArr, indexArr)
    arrLocation.push('Topic')
  }

  const HandleBreadCrumb = (e, i) => {
    if (arrLocation[i] !== 'Topic' && arrLocation[i] !== '') {

    } else { navigate(`/${arrLocation[i]}`) }

  }
  return (
    <div style={{marginLeft:"3%", display: "flex" ,alignItems:"center"}}>
      {arrLocation.map((item, index) => (

        <div key={index} className='BreadCrumb' style={{display:"flex",alignItems:"center"}}>
          <span style={{ cursor: "pointer",padding:"15px 10px" }} key={index} onClick={() => {
            HandleBreadCrumb(item, index)
          }}
          >

            {index === 0 && location.pathname !== "/" ? 'Home' : item ? item : ''}

          </span>
          {arrLocation.length-1 ===index ?'':<ArrowForwardIosIcon style={{height:"12px",display:location.pathname === "/"?"none":''}} fontSize='1px'/>}
        </div>
      ))}</div>
  )
}

export default BreadCrumb