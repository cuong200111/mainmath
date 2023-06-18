import { Box, Button, Fab, Grid, SwipeableDrawer } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { apiKeys } from '../../config/api'
import ButtonAppBar from '../dasboard/addContentTopic/appbar'
import jsPdf from 'jspdf'
import { PictureAsPdf } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close';
import LevelComponent from '../../components/level/Level'
const Exercise = (props) => {
  const doc = new jsPdf()
  const { pathName } = props
  //call api
  const [exprs, setExprs] = useState([])
  const params = new URLSearchParams(window.location.search)
  //IB

  const IB = params.get('IB')
  //Topic
  const title = params.get('title')
  //name Topic
  const id = params.get('id')
  const [fillExprs, setFillExprs] = useState([{ content: "data rong" }])

  const [popup, setpopup] = useState([])

  useEffect(() => {
    async function filExercise() {
      try {
        const fillExer = await axios.get(`${apiKeys}/getExercise`)
        const exerciseMap = await axios.get(`${apiKeys}/getExercise/${IB}/${title}/${id}`)
        setExprs(exerciseMap.data)
        const filterData = fillExer.data.exercise[IB][title].filter(item => {
          const formatStr = item.title.trim()
          if (formatStr === id) {
            return item
          }
        })
        setFillExprs(filterData)
      } catch (error) {
        setExprs([])
      }
    }

    filExercise()
    return () => {
      return 0
    }
  }, [IB, title, id])
  const [activ, setactiv] = useState(-1)
  const [typeFile, setTypeFile] = useState('png')
  const bg_exercise = useRef(null)
  const imgAct = useRef(null)

  useEffect(() => {
    const handleImgClick = (e) => {
      const popups = document.querySelectorAll('.exerciseContainer_popup')
      const closeAppbar = document.querySelector('.closeAppbar')
      for (const popup of popups) {

        if (popup && popup.contains(e.target)) {
          return
        }
      }
      if (closeAppbar && !closeAppbar.contains(e.target)) {
        setactiv(-1)
      }

    }



    document.addEventListener('click', handleImgClick, true)


    return document.removeEventListener('click', handleImgClick)



  }, [activ])
  const [iframePdf, setIFramePdf] = useState(null)
  const handleMark = async (e, i) => {
    const getMark = await axios.get(`${apiKeys}/getArrExercises/${encodeURIComponent(i)}/${encodeURIComponent(e)}`)
    if (getMark.status === 200) {
      if (getMark.data[0].indexOf('.pdf') > -1) {
        setIFramePdf(getMark.data[0])
        setTypeFile('pdf')
        setactiv(i)
      } else {
        setTypeFile('png')
        setpopup(getMark.data)
        setactiv(i)
      }

    }

  }
  const handleFormula = async (e, i) => {
    const getFomula = await axios.get(`${apiKeys}/getArrExercises/${encodeURIComponent(i)}/${encodeURIComponent(e)}`)
    if (getFomula.data[0].indexOf('.pdf') > -1) {
      setTypeFile('pdf')
      setactiv(i)

    } else {
      setTypeFile('png')
      setpopup(getFomula.data)
      setactiv(i)
    }

  }
  const [activeDraw, setActiveDraw] = useState(false)
  const [urlImg, setUrlImg] = useState('')

  const scaleImg = (e) => {
    setActiveDraw(true)
    const url = e.target.getAttribute('src')

    setUrlImg(url);
  }


  const handlPdfAll = () => {
    const doc2 = new jsPdf()
    const lengthExprs = Array.isArray(exprs) ? exprs.length - 1 : -1
    Array.isArray(exprs) && exprs.forEach((item, index) => {
      doc2.addImage(item.question, 'JPEG', 0, 0, doc2.internal.pageSize.width, doc2.internal.pageSize.height);
      if (index !== lengthExprs) {
        doc2.addPage()
      }
    })


    const pdfBlob = doc2.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    // open download dialog
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "images.pdf";
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);

    // clean up
    URL.revokeObjectURL(pdfUrl);
  }


  const handlePdf = async (e, i, nameSave) => {
    const getMark = await axios.get(`${apiKeys}/getArrExercises/${encodeURIComponent(i)}/${encodeURIComponent(e)}`)
    if (getMark && getMark.data) {
      getMark.data.forEach((item, index) => {
        doc.addImage(item, 'JPEG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height)
        if (index !== getMark.data.length - 1) {
          doc.addPage()
        }
      })
      const pdfBlob = doc.output("blob")
      const pdfUrlDownload = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = pdfUrlDownload
      a.download = nameSave
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(pdfUrlDownload)
    }
  }

  return (
    <div style={{ height: "auto" }}>
      <div ref={bg_exercise} style={{ position: 'fixed', width: "100%", height: "100%", background: "#0000001f", top: "0", left: "0", zIndex: "1" }} className={`bg_exercise ${activ !== -1 ? 'active' : ''}`}></div>
      <Box>
        <Grid style={{ marginLeft: "12px" }}><h1>
          {id}
          <Fab onClick={handlPdfAll} style={{ marginLeft: "12px", height: "36px", width: "36px", zIndex: -1 }}><PictureAsPdf style={{ height: "20px", width: "20px" }} /></Fab>
        </h1>
          <div style={{ wordBreak: "break-word", padding: "0px 12px" }}>{id ? Array.isArray(fillExprs) && fillExprs.length > 0 ? fillExprs[0].content : 'Không có data trên server' : 'data rong'}</div>
        </Grid>


        <Grid className='exerciseContainer_main'>
          {Array.isArray(exprs) && exprs.map((item, index) => (

            <Grid key={index} className='exerciseContainer'>


              <Grid className='exerciseContainer_left'>
                <Grid className='exerciseContainer_left_top'>
                  Question {Number(item.id) + 1}
                </Grid>
                <Grid className='exerciseContainer_left_bottom'>
                  <img onClick={(e) => { scaleImg(e) }} src={item.question} alt="" />
                </Grid>
              </Grid>

              <Grid className='exerciseContainer_right'>
                <Grid className='exerciseContainer_right_level'>
                  <LevelComponent levelProps={item} />
                </Grid>
                <Grid className='exerciseContainer_right_bottom'>
                  {/* <Fab onClick={() => { handlePdf(item.formula, index, 'formula') }} style={{ marginRight: "12px", height: "36px", width: "36px" }}><PictureAsPdf style={{ height: "20px", width: "20px" }} /></Fab> */}
                  <img onClick={() => { handlePdf(item.formula, index, 'formula') }} src="./img/icon/docIcon.png" />
                  <h5 onClick={() => { handleFormula(item.formula, index) }} style={{ width: "150px" }}>
                    Formula Booklet
                  </h5>

                </Grid>
                <Grid className='exerciseContainer_right_top'>
                  {/* <Fab onClick={() => { handlePdf(item.mark, index, 'mark') }} style={{ marginRight: "12px", height: "36px", width: "36px" }}><PictureAsPdf style={{ height: "20px", width: "20px" }} /></Fab> */}
                  <img onClick={() => { handlePdf(item.mark, index, 'mark') }} src="./img/icon/docIcon.png" />
                  <h5 onClick={() => { handleMark(item.mark, index) }} style={{ width: "150px" }}>
                    Mark Scheme
                  </h5>

                </Grid>

              </Grid>

              <div className={`exerciseContainer_popup ${activ === index ? 'active' : ''}`}>
                {popup.map((item, subIndex) => (
                  <div style={{ height: "100%" }}>
                    {typeFile === 'pdf' ? null : <img ref={imgAct} onClick={(e) => { scaleImg(e) }} src={item} alt="" />}
                  </div>
                ))}

              </div>

            </Grid>
          ))}
        </Grid>
      </Box>
      {typeFile === 'pdf' ?
        <div style={{ position: "fixed", background: "white", height: "100%", width: "100%", left: 0, top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
          <div style={{ width: "100%", height: "5%", background: "#d7d7f7" }}>
            <Fab onClick={() => { setTypeFile('png') }} style={{ marginLeft: "12px", height: "36px", width: "36px", zIndex: 100 }}><CloseIcon style={{ height: "20px", width: "20px" }} /></Fab>
          </div>
          <iframe style={{ width: "100%", height: "95%" }} src={iframePdf && iframePdf} />
        </div> :
        null}

      <SwipeableDrawer style={{ width: `${window.innerWidth}px` }} anchor={'right'} open={activeDraw} onClose={() => setActiveDraw(false)} onOpen={() => setActiveDraw(true)}>
        <div style={{ width: `${window.innerWidth}px`, height: "100vh", background: "white" }}>
          <Grid container style={{ width: "100%", position: "fixed", zIndex: "100" }}>
            <ButtonAppBar className="closeAppbar" onClose={() => {
              setActiveDraw(false)
            }} />

          </Grid>
          <Grid container style={{ width: "100%", display: "flex", justifyContent: "center" }}>

            <img className='imgDraw' src={urlImg} />
          </Grid>
        </div>


      </SwipeableDrawer>
    </div>
  )
}

export default Exercise