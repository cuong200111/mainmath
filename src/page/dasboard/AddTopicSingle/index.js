import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { apiKeys } from '../../../config/api'
import { Mycontext } from '../../Layout/index'
import { useRef } from 'react'


const AddTopicSingle = (props) => {


    const value = useContext(Mycontext)
    const dirMapTopic = ['Exam', 'Topic']
    const [listAccount, setlistAccount] = useState([])
    const [nameAccount, setNameAccount] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [Topic, setTopic] = useState('')
    const [loopData, setLoopData] = useState(false)


    const handleAddTopic = async () => {
        setLoopData(true)
        if (loopData) {

        } else {
            const response = await axios.post(`${apiKeys}/addTopicPrivate`, {
                nameAccount,
                title,
                description,
                Topic
            })
            if (response.status === 200) {
                setLoopData(false)
            }
        }

    }
    useEffect(() => {
        axios.get(`${apiKeys}/getlistAccount`).then((res) => {
            if (res.status === 200) {
                setlistAccount(res.data.listAccount)
            }

        })
    }, [])
    const handleChange1 = (e) => {
        setNameAccount(e.target.value)
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
            <div style={{ width: "100%", position: "fixed", top: "0%" }}>
                <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "70px" }} >
                </div>
            </div>
            <Grid className='addTopic_content' style={{

            }}>
                <Grid>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Chọn tài khoản</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={nameAccount}
                            label="Nhập Topic"
                            onChange={handleChange1}
                        >

                            {listAccount && listAccount.map((item, index) => (
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


export default AddTopicSingle
