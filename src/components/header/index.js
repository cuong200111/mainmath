<<<<<<< HEAD
import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import popupContent from '../../data/popupContent.json'
import popup from '../../data/popup.json'
import { Mycontext } from "../../page/Layout";
=======
import {Grid } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mycontext } from "../../page/Layout";
import axios from "axios";
import { apiKeys } from "../../config/api";
>>>>>>> mainmathnew
const Header = (props) => {
  const [iColor, setBgColor] = useState(null)
  const [textDec, setTextDec] = useState(0)
  const [idPopup, setIdPopup] = useState([])
<<<<<<< HEAD
=======
  //call Api
  const [popupContent, setPopupContent] = useState([])
  //call Api
  const [popup, setPopup] = useState([])
  //call Api

  useEffect(() => {
    async function handleDataPopup() {
      const dataPopup = await axios.get(`${apiKeys}/getPopup`)
      setPopup(dataPopup.data.popup)
      setPopupContent(dataPopup.data.popupContent)

    }

    handleDataPopup()
    return () => {
      return 0
    }
  }, [])
>>>>>>> mainmathnew
  const value = useContext(Mycontext)
  const location = useLocation()
  const titles = [
    { icon: "/img/icon/chevron-down-outline.svg", title: "subject" },
    { icon: "", title: "course" }
  ]

  const activePopup = useRef(null)

  useEffect(() => {
    const handlePopup = (e) => {
      if (activePopup.current && !activePopup.current.contains(e.target)) {
        activePopup.current.classList.remove('active')
      }
    }
    document.addEventListener('click', handlePopup, true)

    return () => {
      document.removeEventListener('click', handlePopup)
    }
  }, [])

  return (
    <div className="header">
      <div className="header_container">
        <div className="header_container_left">
          <img src="/img/logo/logo.jpg" alt="#" />
        </div>
        <div className="header_container_between">
          <Grid container className="header_container_between_items">
            {titles.map((items, indexs) => (
              <Grid className="header_container_between_items_s" key={indexs} onClick={() => {
                if (indexs === 0) {
                  activePopup.current.classList.add('active')
                }
              }}>
<<<<<<< HEAD
                <span> {items.title} </span><icon>{items.icon ? <img style={{ width: "20px" }} src={items.icon} alt="#" /> : ''}</icon>
=======
                <span> {items.title} </span><>{items.icon ? <img style={{ width: "20px" }} src={items.icon} alt="#" /> : ''}</>
>>>>>>> mainmathnew
                {indexs === 0 ?
                  <Grid ref={activePopup} container className="header_container_between_items_s_popup">

                    <Grid className="header_container_between_items_s_popup_left">
<<<<<<< HEAD
                      {popup.map((iteml, indexl) => (
                        <Grid style={{ transition: '0.5s', backgroundColor: `${iColor === indexl ? '#ececec' : ''}` }} onMouseOver={() => {
                          setBgColor(indexl)

                          const newArrPopup = popupContent.filter(itemz => itemz.id === iteml.item)

                          setIdPopup(newArrPopup)
                        }} className="header_container_between_items_s_popup_left_content" container key={indexl}>
                          <span >  {iteml.item}  </span><icon><img width={20} src={iteml.img} alt="#" /></icon>

=======
                      {popup && popup.map((iteml, indexl) => (
                        <Grid style={{ transition: '0.5s', backgroundColor: `${iColor === indexl ? '#ececec' : ''}` }} onMouseOver={() => {
                          setBgColor(indexl)
                          const newArrPopup = popupContent && popupContent.filter(itemz => itemz.id === iteml.item)
                          setIdPopup(newArrPopup)
                        }} className="header_container_between_items_s_popup_left_content" container key={indexl}>
                          <span >  {iteml.item}  </span><><img width={20} src={iteml.img} alt="#" /></>
>>>>>>> mainmathnew
                        </Grid>))}
                    </Grid>

                    <Grid className="header_container_between_items_s_popup_right">
                      <Grid container className="header_container_between_items_s_popup_right_top">
                        {idPopup.map((itemr, indexr) => (
<<<<<<< HEAD
                          <Grid xs={6} className="header_container_between_items_s_popup_right_top_content" key={indexr}>
=======
                          <Grid item xs={6} className="header_container_between_items_s_popup_right_top_content" key={indexr}>
>>>>>>> mainmathnew
                            {itemr.title.content}
                          </Grid>
                        ))}
                      </Grid>

                      <Grid container className="header_container_between_items_s_popup_right_bottom">
                        {idPopup.map((itemb, indexb) => {


                          return (

<<<<<<< HEAD
                            <Grid xs={6} className="header_container_between_items_s_popup_right_bottom_content" key={indexb}>
                              {itemb.title.topic.map((topic, indexz) => (
                                <Grid style={{ margin: "10px" }}>
                                  <Link onClick={()=>{
                                
                                    value.setCrumb(location.pathname +'/'+ topic)
=======
                            <Grid item xs={6} className="header_container_between_items_s_popup_right_bottom_content" key={indexb}>
                              {itemb.title.topic.map((topic, indexz) => (
                                <Grid style={{ margin: "10px" }}>
                                  <Link onClick={() => {
                                    value.setCrumb(location.pathname + '/' + topic)
>>>>>>> mainmathnew
                                  }} to={`${textDec.indexb === indexb && textDec.indexz === indexz ? `/Topic/${itemb.title.content}?title=${topic}` : '#'}`} onMouseOver={() => {

                                    setTextDec({ indexz, indexb })

                                  }} style={{ textDecoration: `${textDec.indexb === indexb && textDec.indexz === indexz ? 'underline' : ''}` }} > {topic}</Link>
                                </Grid>
                              ))}
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Grid> : ''}
              </Grid>))}
          </Grid>

        </div>
        <div className="header_container_right"><Link to='/login'>Login</Link></div>
      </div>
    </div>
  );
};

export default Header;

