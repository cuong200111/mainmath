import { AppBar, Box, Button, FormControl, Grid, Icon, InputLabel, MenuItem, Select, SwipeableDrawer, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { apiKeys } from '../../../config/api'
import { Mycontext } from '../../Layout/index'
import { MuiFileInput } from 'mui-file-input'
import BasicSelect from './option'
import ButtonAppBar from './appbar'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { Send } from '@mui/icons-material'
import { connect } from 'react-redux'
import { actionNoti } from '../../../redux/action'
import anime from 'animejs'

const AddContentTopicSingle = (props) => {
    const { noti } = props
    const [timeEnd, setTimeEnd] = useState(true)

    const [Snackbar, setSnackbar] = useState(() => <></>)

    useEffect(() => {
        const ElementSnack = () => {
            return props.Snackbar
        }
        setSnackbar(<ElementSnack />)
    }, [props.Snackbar])
    const Snackbars = () => {
        if (!timeEnd) {
            return <>{Snackbar} </>
        } else {
            return
        }



    }
    const snackRef = useRef(null)
    useEffect(() => {
        anime({
            targets: snackRef.current,
            duration: 2000,
            right: ["-2%", "2%"]

        })
    }, [Snackbar])
    const value = useContext(Mycontext)

    const [dirMap, setDirmap] = useState([])

    //Name 
    //toppic
    const [dirName, setDirname] = useState('')
    //nameSingle
    const [nameSingle, setNameSingle] = useState('')
    //nameTopic đại số
    const [nameTopic, setNameTopic] = useState('')
    const [inputType, setInputType] = useState('')
    const [indexJson, setIndexJson] = useState(0)
    const [typeFile, setTypeFile] = useState('png')
    const [activeDraw, setActiveDraw] = useState(false)

    useEffect(() => {
        async function listDir() {
            const dirIB = await axios.get(`${apiKeys}/getlistAccount`)
            setDirmap(dirIB.data.listAccount)
        }
        listDir()
        return () => {
            return 0
        }
    }, [])
    useEffect(() => {
        async function indexs() {
            if (dirName, nameSingle, nameTopic) {
                const i = await axios.get(`${apiKeys}/getIndexSingle/${nameSingle}/${nameTopic}/${dirName}`)
                setIndexJson(i.data);
            } else {
                return
            }
        }

        indexs()

    }, [dirName, nameSingle, nameTopic])
    const handleOption = (value, value2, value3) => {
        setDirname(value)
        setNameSingle(value2)
        setNameTopic(value3)
        setActiveDraw(true)

    }
    const type = [
        'easy',
        'hard',
        'medium'
    ]
    //formula
    const [input1, setInput1] = useState([])
    //mark
    const [input2, setInput2] = useState([])
    //question
    const [input3, setInput3] = useState(null)

    const handleInput = (e) => {

        setInputType(e.target.value)
    }
    // `question${indexJson + 1}.jpg`
    const [loopData ,setLoopData] = useState(false)
    console.log(loopData,'loopData');
    const sendData = async () => {
        setLoopData(true)

        if(loopData){
            console.log('bam cham lai');
        }else{
            setTimeEnd(false)
            setTimeout(() => {
                setTimeEnd(true)
            }, 5000)
    
    
            if (typeFile === 'png') {
                if (!Array.isArray(input1) || !Array.isArray(input2) || !Boolean(input3)) {
                    noti({
                        msg: 'Hãy chọn đủ 4 ô nhập',
                        varirant: "warning"
                    })
                } else {
                    let formData = new FormData()
                    for (let i = 0; i < input1.length; i++) {
                        formData.append(`formula`, input1[i])
    
                    }
                    for (let i = 0; i < input2.length; i++) {
                        formData.append(`mark`, input2[i])
                    }
                    formData.append(`question`, input3,)
                    formData.append(`type`, inputType)
                    if (input1.length === 0 || input2.length === 0 || Object.keys(input3).length !== 0) {
                        noti({
    
                            msg: 'Hãy chọn đủ 4 ô nhập',
                            varirant: "warning",
                        })
                    } else {
                        const resDataForm = await axios.post(`${apiKeys}/addcontenttopicSingle/${nameSingle}/${dirName}/${nameTopic}?id=${indexJson + 1}`, formData)
                        console.log(resDataForm);
                        if (resDataForm.status === 200) {
                         
                            setLoopData(false)
                            async function indexs() {
                                if (dirName) {
                                    const i = await axios.get(`${apiKeys}/getIndexSingle/${nameSingle}/${nameTopic}/${dirName}`)
                                    setIndexJson(i.data);
                                } else {
                                    return
                                }
                            }
    
                            indexs()
                            noti({
                                msg: 'Thêm thành công',
                                varirant: "success"
                            })
                        }
                        else {
                            noti({
                                msg: 'Lỗi hệ thống',
                                varirant: "error"
                            })
                        }
                    }
    
                }
    
            } else if (typeFile === 'pdf') {
    
                if (!Boolean(input1) || !Boolean(input2) || !Boolean(input3)) {
                    noti({
                        msg: 'Hãy chọn đủ 4 ô nhập',
                        varirant: "warning"
                    })
    
                } else {
                    console.log('pdf')
    
    
                    if (Object.keys(input1).length !== 0 || Object.keys(input2).length !== 0 || Object.keys(input3).length !== 0) {
                        noti({
    
                            msg: 'Hãy chọn đủ 4 ô nhập',
                            varirant: "warning",
                        })
                    } else {
                        let formData = new FormData()
                        formData.append(`formula`, input1)
                        formData.append(`mark`, input2)
                        formData.append(`question`, input3,)
                        formData.append(`type`, inputType)
                        const resDataForm = await axios.post(`${apiKeys}/addcontenttopicSingle/${nameSingle}/${dirName}/${nameTopic}?id=${indexJson + 1}`, formData)
                        console.log(resDataForm)
                        if (resDataForm.status === 200) {
                            setLoopData(false)
                            async function indexs() {
                                if (dirName) {
                                    const i = await axios.get(`${apiKeys}/getIndexSingle/${nameSingle}/${nameTopic}/${dirName}`)
                                    setIndexJson(i.data);
                                } else {
                                    return
                                }
                            }
    
                            indexs()
                            noti({
                                msg: 'Thêm thành công',
                                varirant: "success"
                            })
                        }
                        else {
                            noti({
                                msg: 'Lỗi hệ thống',
                                varirant: "error"
                            })
                        }
                    }
    
                }
            }
    
    
        }
    

    }

    return (
        <div style={{ overflow: "hidden" }}>

            <div>
                <BasicSelect setActiveDraw={setActiveDraw} valueButton={'Chọn topic này'} name={dirMap && dirMap} handleClick={handleOption} label={"Chọn Topic muốn thêm ảnh"} activeDraw={activeDraw} />

            </div>
            <SwipeableDrawer anchor={activeDraw ? 'right' : 'left'} open={activeDraw} onClose={() => setActiveDraw(false)} onOpen={() => setActiveDraw(true)}>
                <div style={{ width: `${window.innerWidth}px`, overflow: "hidden" }}>

                    <ButtonAppBar onClose={() => {
                        async function listDir() {
                            const dirTopic = await axios.get(`${apiKeys}/getDirIB`)
                            setDirmap(dirTopic.data)
                        }
                        listDir()
                        setActiveDraw(false)
                    }} />
                    <Grid style={{
                        height: `${window.innerHeight - 64}px`,
                        display: "flex",

                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div style={{ position: "absolute", top: 66, left: 0 }}>
                            <Button onClick={() => {
                                setInput1([])
                                setInput2([])
                                setInput3(null)
                                setTypeFile('png')
                            }} style={{ background: typeFile === 'png' ? "black" : 'white', color: typeFile === 'png' ? 'white' : 'black' }} variant='outlined'>Png</Button>
                            <Button onClick={() => {
                                setInput1(null)
                                setInput2(null)
                                setInput3(null)
                                setTypeFile('pdf')
                            }} style={{ margin: "0 0 0 20px", background: typeFile === 'pdf' ? "black" : 'white', color: typeFile === 'pdf' ? 'white' : 'black' }} variant='outlined'>Pdf</Button>
                        </div>
                        <form style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} encType="multipart/form-data">
                            <Grid>
                                <h1>
                                    Hiện tại {dirName} đang có {indexJson + 1} câu hỏi
                                </h1>
                            </Grid>
                            <Grid style={{ margin: "12px" }}>
                                <MuiFileInput onChange={(e) => {
                                    setInput1(e)
                                }} className='formula' value={input1} label="Nhập vào formula" multiple={typeFile === 'png' ? true : false} />
                            </Grid>
                            <Grid style={{ margin: "12px" }}>
                                <MuiFileInput onChange={(e) => {

                                    setInput2(e)
                                }} name='mark' value={input2} label="Nhập vào mark" multiple={typeFile === 'png' ? true : false} />
                            </Grid>
                            <Grid style={{ margin: "12px" }}>
                                <MuiFileInput onChange={(e) => {
                                    setInput3(e)
                                }} name='question' value={input3} label="Nhập vào question" />
                            </Grid>
                            <Grid style={{ margin: "12px", width: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Chọn mức độ</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={inputType}
                                        label="Chọn mức độ"
                                        onChange={handleInput}
                                    >

                                        {type && type.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}


                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid style={{ width: "80%", display: "flex", justifyContent: 'center', position: "absolute", top: "100%" }}>
                                <Button onClick={sendData} style={{ padding: "15px", width: "50%" }} color='secondary' variant='outlined'>
                                    <Send />
                                </Button>
                            </Grid>

                        </form>
                    </Grid>
                    <div style={{ width: "100%", position: "fixed", top: "12%" }}>
                        <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "100px" }} >
                            <div style={{ width: "23%", position: "absolute", top: "12%", right: "2%" }} ref={snackRef}>
                                <Snackbars />
                            </div>
                        </div>
                    </div>
                </div>



            </SwipeableDrawer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Snackbar: state.dataGlobal.notification,
    }
}
const mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        noti: ({ msg, varirant }) => dispatch(actionNoti({ varirant: varirant, msg: msg }))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddContentTopicSingle)