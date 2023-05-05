import { AppBar, Box, Button, FormControl, Grid, Icon, InputLabel, MenuItem, Select, SwipeableDrawer, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { apiKeys } from '../../../config/api'
import { Mycontext } from '../../Layout/index'
import { MuiFileInput } from 'mui-file-input'
import BasicSelect from './option'
import ButtonAppBar from './appbar'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { Send } from '@mui/icons-material'

const AddContentTopic = () => {
    const value = useContext(Mycontext)
    useEffect(() => {
        value.setShow(false)
        return () => {
            value.setShow(true)
        }
    })
    const [dirMap, setDirmap] = useState([])

    //Name 
    //toppic
    const [dirName, setDirname] = useState('')
    //IB
    const [IB, setIB] = useState('')
    //nameTopic đại số
    const [nameTopic, setNameTopic] = useState('')
    const [inputType, setInputType] = useState('')
    const [indexJson, setIndexJson] = useState(0)

    const [activeDraw, setActiveDraw] = useState(false)

    useEffect(() => {
        async function listDir() {
            const dirIB = await axios.get(`${apiKeys}/getDirIB`)
            setDirmap(dirIB.data)
        }
        listDir()
        return () => {
            return 0
        }
    }, [])
    useEffect(() => {
        async function indexs() {
            if (dirName, IB, nameTopic) {
                const i = await axios.get(`${apiKeys}/getIndex/${IB}/${dirName}/${nameTopic}`)
                setIndexJson(i.data);
            } else {
                return
            }
        }

        indexs()

    }, [dirName, IB, nameTopic])
    const handleOption = (value, value2, value3) => {
        setDirname(value)
        setIB(value2)
        setNameTopic(value3)

        setActiveDraw(true)

    }
    const type = [
        'easy',
        'hard',
    ]
    //formula
    const [input1, setInput1] = useState(null)
    //mark
    const [input2, setInput2] = useState(null)
    //question
    const [input3, setInput3] = useState(null)
    //pdf chưa làm
    const handleInput = (e) => {
   
        setInputType(e.target.value)
    }

    const sendData = async () => {

        const formData = new FormData
        formData.append(`formula`, input1, `formula${indexJson + 1}.jpg`)
        formData.append(`mark`, input2, `mark${indexJson + 1}.jpg`)
        formData.append(`question`, input3, `question${indexJson + 1}.jpg`)
        formData.append(`type`, inputType)

        const resDataForm = await axios.post(`${apiKeys}/addcontenttopic/${IB}/${dirName}/${nameTopic}?id=${indexJson + 1}`, formData)
        if (resDataForm.status === 200) {
            async function indexs() {
                if (dirName) {
                    const i = await axios.get(`${apiKeys}/getIndex/${IB}/${dirName}/${nameTopic}`)
                    setIndexJson(i.data);
                } else {
                    return
                }
            }

            indexs()
        }
        else {
            alert('failure')
        }

    }
 
    return (
        <div>
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

                        <form style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} encType="multipart/form-data">
                            <Grid>
                                <h1>
                                    Hiện tại {dirName} đang có {indexJson} câu hỏi
                                </h1>
                            </Grid>
                            <Grid style={{ margin: "12px" }}>
                                <MuiFileInput onChange={(e) => {
                                    setInput1(e)
                                }} className='formula' value={input1} label="Nhập vào formula" />
                            </Grid>
                            <Grid style={{ margin: "12px" }}>
                                <MuiFileInput onChange={(e) => {
                                    setInput2(e)
                                }} name='mark' value={input2} label="Nhập vào mark" />
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


                </div>
            </SwipeableDrawer>
        </div>
    )
}


export default AddContentTopic