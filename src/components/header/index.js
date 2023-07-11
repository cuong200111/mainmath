import { Avatar, Box, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mycontext } from "../../page/Layout";
import axios from "axios";
import { apiKeys } from "../../config/api";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import BookIcon from '@mui/icons-material/Book';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
const Header = (props) => {
  const navigate = useNavigate()
  const [iColor, setBgColor] = useState(null)
  const [textDec, setTextDec] = useState(0)
  const [idPopup, setIdPopup] = useState([])
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
  const [dataProfile, setDataProfile] = useState(null)
  useEffect(() => {
    if (Boolean(localStorage.getItem('online'))) {
      if (localStorage.getItem('token')) {
        const actionProfile = async () => {
          try {
            const dataUser = await axios.get(`${apiKeys}/getProfile`, { headers: { Authorization: localStorage.getItem('token') } });
            setDataProfile(dataUser.data)
          } catch (error) {

          }


        }
        actionProfile()
      }

    }

  }, [])
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
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
                <span> {items.title} </span><>{items.icon ? <img style={{ width: "20px" }} src={items.icon} alt="#" /> : ''}</>
                {indexs === 0 ?
                  <Grid ref={activePopup} container className="header_container_between_items_s_popup">

                    <Grid className="header_container_between_items_s_popup_left">
                      {popup && popup.map((iteml, indexl) => (
                        <Grid style={{ transition: '0.5s', backgroundColor: `${iColor === indexl ? '#ececec' : ''}` }} onMouseOver={() => {
                          setBgColor(indexl)
                          const newArrPopup = popupContent && popupContent.filter(itemz => itemz.id === iteml.item)
                          setIdPopup(newArrPopup)
                        }} className="header_container_between_items_s_popup_left_content" container key={indexl}>
                          <span >  {iteml.item}  </span><><img width={20} src={iteml.img} alt="#" /></>
                        </Grid>))}
                    </Grid>

                    <Grid className="header_container_between_items_s_popup_right">
                      <Grid container className="header_container_between_items_s_popup_right_top">
                        {idPopup.map((itemr, indexr) => (
                          <Grid item xs={6} className="header_container_between_items_s_popup_right_top_content" key={indexr}>
                            {itemr.title.content}
                          </Grid>
                        ))}
                      </Grid>

                      <Grid container className="header_container_between_items_s_popup_right_bottom">
                        {idPopup.map((itemb, indexb) => {


                          return (

                            <Grid item xs={6} className="header_container_between_items_s_popup_right_bottom_content" key={indexb}>
                              {itemb.title.topic.map((topic, indexz) => (
                                <Grid style={{ margin: "10px" }}>
                                  <Link onClick={() => {
                                    value.setCrumb(location.pathname + '/' + topic)
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
        {Boolean(localStorage.getItem('online')) ?

          // Not online
          <div className="header_container_right">
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 36, height: 36, backgroundColor: "#c11a1a" }}>{dataProfile && dataProfile.account.charAt(0).toUpperCase()} </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                style={{
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',

                }}
                sx={{
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  }
                }
                }
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Thông tin tài khoản
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Liên kết tài khoản
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Sửa thông tin tài khoản
                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose()
                  navigate(`singleTopic?topic=Exam`)
                }}>
                  <ListItemIcon>
                    <BookIcon fontSize="small" />
                  </ListItemIcon>
                  Bài tập
                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose()
                  navigate(`singleTopic?topic=Topic`)
                }}>
                  <ListItemIcon>
                    <PsychologyAltIcon fontSize="small" />
                  </ListItemIcon>
                  Câu hỏi
                </MenuItem>
                <MenuItem onClick={() => {
                  setAnchorEl(null);
                  localStorage.removeItem('online')
                  localStorage.removeItem('token')
                  window.location.reload()
                }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </Menu>
            </Box>

          </div>
          :
          <div className="header_container_right">
            <Link to='/login'>Login</Link>
          </div>}

      </div>
    </div >
  );
};

export default Header;

