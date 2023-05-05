import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { apiKeys } from '../../../config/api'
import { Mycontext } from '../../Layout/index'
const AddTopic = () => {


    const value = useContext(Mycontext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dirMap, setDirmap] = useState([])
    const dirMapTopic = ['Exam', 'Topic']
    const [IB, setIB] = useState('')
    const [Topic, setTopic] = useState('')
    useEffect(() => {
        value.setShow(false)
        return () => {
            value.setShow(true)
        }
    })
    const handleAddTopic = async () => {
        const addTopic = await axios.post(`${apiKeys}/addTopic`, { title, description, IB, Topic })
        console.log(addTopic)
    }
    useEffect(() => {
        async function listDir() {
            const dirIB = await axios.get(`${apiKeys}/getDirIB`)
            console.log(dirIB);
            setDirmap(dirIB.data)
        }
        listDir()
        return () => {
            return 0
        }
    }, [])
    const handleChange1 = (e) => {
        setIB(e.target.value)
    }
    const handleChange2 = (e) => {
        setTopic(e.target.value)
    }
    return (
        <div className='addTopic' style={{
            height: "100vh",
            width: "100%",
            display: "flex",

            justifyContent: "center",
            alignItems: "center",

        }}>
            <Grid className='addTopic_content' style={{

            }}>
                <Grid>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Nhập IB</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={IB}
                            label="Nhập IB"
                            onChange={handleChange1}
                        >

                            {dirMap && dirMap.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Nhập Topic</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Topic}
                            label="Nhập Topic"
                            onChange={handleChange2}
                        >

                            {dirMapTopic && dirMapTopic.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <TextField onChange={(e) => {
                        setTitle(e.target.value)
                    }} id="outlined-basic" label="Tên Topic" variant="outlined" />
                </Grid>
                <Grid>
                    <TextField onChange={(e) => {
                        setDescription(e.target.value)
                    }} id="outlined-basic" label="Tên mô tả" variant="outlined" />
                </Grid>
                <Grid>
                    <Button onClick={handleAddTopic} style={{ width: "100%" }} variant="contained">Thêm</Button>
                </Grid>
            </Grid>
        </div>
    )
}


export default AddTopic