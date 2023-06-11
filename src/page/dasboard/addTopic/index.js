import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { apiKeys } from '../../../config/api'
import { Mycontext } from '../../Layout/index'
import { useRef } from 'react'
import anime from 'animejs'
import { actionNoti } from '../../../redux/action'
import { connect } from 'react-redux'
const AddTopic = (props) => {
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




    const [timeoutId, setTimeoutId] = useState(null);

    const handleAddTopic = async () => {
        setTimeEnd(false)

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setTimeEnd(true);
        }, 5000);

        setTimeoutId(newTimeoutId); // store new timeout ID

        // rest of your code
    

    if (title.length === 0 || description.length === 0 || Topic.length === 0 || IB.length === 0) {
        noti({
            msg: 'Vui lòng nhập đủ thông tin các trường',
            varirant: "warning",
        })
    } else {
        const findDulicate = await axios.get(`${apiKeys}/getExercise`)
        const data = findDulicate.data.exercise[IB][Topic]
        const filterData = data.filter((item) => {
            if (item.title !== title) {
                return false
            } else {
                return item

            }
        })
        if (filterData.length) {
            noti({
                msg: 'Dữ liệu đã tồn tại',
                varirant: "warning",
            })
        } else {
            const addTopic = await axios.post(`${apiKeys}/addTopic`, { title, description, IB, Topic })

            if (addTopic.status === 200) {
                noti({
                    msg: 'Thêm thành công dữ liệu',
                    varirant: "success",
                })
            } else {
                noti({
                    msg: 'Lỗi khi thêm tài liệu',
                    varirant: "error",
                })
            }
        }

    }


}
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
        <div style={{ width: "100%", position: "fixed", top: "0%" }}>
            <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "70px" }} >
                <div style={{ width: "23%", position: "absolute", top: "12%", right: "2%" }} ref={snackRef}>
                    <Snackbars />
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTopic)
