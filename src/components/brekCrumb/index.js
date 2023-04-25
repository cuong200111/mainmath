import React, { useContext } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Mycontext } from '../../page/Layout'
import { Button } from '@mui/material'

const BreadCrumb = (props) => {
  const id = props
  const location = useLocation()
  const navigate = useNavigate()

  const arrLocation = location.pathname.split('/').map((item) => {
    return item.replace(/%20/g, " ")
  })
  const HandleBreadCrumb = (e, i) => {
    if (arrLocation[i] !== 'Topic' && arrLocation[i] !== '') {

    } else { navigate(`/${arrLocation[i]}`) }

  }
  return (
    <div style={{ display: "flex" }}>
      {arrLocation.map((item, index) => (

        <Button onClick={() => {
          HandleBreadCrumb(item, index)
        }}
          style={{ padding: "10px 10px" }}>

          {index === 0 && location.pathname !== "/" ? 'home' : item ? item : ''}

        </Button>
      ))}</div>
  )
}

export default BreadCrumb