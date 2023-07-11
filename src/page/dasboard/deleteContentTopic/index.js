
import React, { useContext, useEffect, useState } from 'react'
import { Mycontext } from '../../Layout'
import BasicSelect from './option'
import axios from 'axios'
import { apiKeys } from '../../../config/api'
import { Grid, SwipeableDrawer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ButtonAppBar from './appbar'
import { connect } from 'react-redux'
import { actionNoti } from '../../../redux/action'
import { useRef } from 'react'
import anime from 'animejs'

const DeleteContentTopic = (props) => {
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
        if(!timeEnd){
            return <>{Snackbar} </>
        }else{
            return
        }
        


    }
    const snackRef = useRef(null)
    useEffect(() => {
        anime({
            targets: snackRef.current,
            duration: 2000,
            left: ["-2%", "2%"]

        })
    }, [Snackbar])
    const value = useContext(Mycontext)
  
    const [activeDraw, setActiveDraw] = useState(false)
    const [dirMap, setDirmap] = useState([])

    //Name 
    //toppic
    const [dirName, setDirname] = useState('')
    //IB
    const [IB, setIB] = useState('')
    //nameTopic đại số
    const [nameTopic, setNameTopic] = useState('')
    const [inputType, setInputType] = useState('')
    const [dataDelete, setDataDelete] = useState([])
    const [delsucsess, setSucsessDel] = useState('')
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
                const data = await axios.get(`${apiKeys}/getDeleteExercise/${IB}/${dirName}/${nameTopic}`)
                setDataDelete(data.data)
            } else {
                return
            }
        }

        indexs()

    }, [dirName, IB, nameTopic, delsucsess])

    const handleOption = (value, value2, value3) => {
        setDirname(value)
        setIB(value2)
        setNameTopic(value3)
        setActiveDraw(true)

    }
    const arrTableHead = [
        {
            label: 'stt'
        },
        {
            label: 'IB'
        },
        {
            label: 'type'
        },
        {
            label: 'nameType'
        },
        {
            label: 'question'
        },
        {
            label: 'action'
        }
    ]
    const newArr = dataDelete.map((item, index) => {
        return ({
            stt: index,
            IB,
            dirName,
            nameTopic,
            question: `Câu hỏi ${item.id}`,
            buttonDel: <button onClick={async () => {
                setTimeEnd(false)
                setTimeout(()=>{
                    setTimeEnd(true)
                },5000)
                const data2 = await axios.get(`${apiKeys}/getDeleteExercise/${IB}/${dirName}/${nameTopic}`)
                const dirformula = item.formula
                const dirMark = item.mark
                const question = item.question
                const id = item.id
                const delItem = await axios.delete(`${apiKeys}/deleteContentTopic?fomula=${dirformula}&mark=${dirMark}&question=${question}&id=${id}&IB=${IB}&nameTopic=${nameTopic}&dirName=${dirName}`)
                if (delItem.status === 200) {
                    noti({

                        msg: 'Xóa thành công',
                        varirant: "success",
                    })
                    const data = await axios.get(`${apiKeys}/getDeleteExercise/${IB}/${dirName}/${nameTopic}`)
                    setDataDelete(data.data)
                } else {
                    noti({
                        msg: 'Xóa thất bại',
                        varirant: "error",
                    })
                    setSucsessDel('failure')
                }


            }}>Xóa</button>
        })
    })
    return (
        <>

            <BasicSelect setActiveDraw={setActiveDraw} valueButton={'Chọn topic này'} name={dirMap && dirMap} handleClick={handleOption} label={"Chọn Topic muốn thêm ảnh"} activeDraw={activeDraw} />
            <SwipeableDrawer onOpen={() => {
                setActiveDraw(true)
            }} anchor='right' open={activeDraw} onClose={() => { setActiveDraw(false) }}>
                <div style={{ width: "100%", position: "fixed", top: "0%" }}>
                        <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "70px" }} >
                            <div style={{ width: "23%", position: "absolute", top: "12%", left: "2%" }} ref={snackRef}>
                                <Snackbars />
                            </div>
                        </div>
                    </div>
                <div
                    style={{ width: `${window.innerWidth}px`, height: "100vh" }}
                >
                    <Grid item container> <ButtonAppBar onClose={() => {
                        setActiveDraw(false)
                    }} /></Grid>
                    <Grid item container>

                        <Table className='TableDelete'>
                            <TableHead className='TableDelete_Head'>
                                <TableRow className='TableDelete_Head_Row'>
                                    {arrTableHead.map((item) => {
                                        return <TableCell className='TableDelete_Head_Row_Cell'>{item.label}</TableCell>
                                    })}
                                </TableRow>

                            </TableHead>
                            <TableBody className='TableDelete_Body'>
                                {newArr && newArr.map((item) => {
                                    return (
                                        <TableRow className='TableDelete_Body_Row'>
                                            <TableCell className='TableDelete_Body_Row_Cell'>
                                                {item.stt}
                                            </TableCell>
                                            <TableCell className='TableDelete_Body_Row_Cell'>
                                                {item.IB}
                                            </TableCell>
                                            <TableCell className='TableDelete_Body_Row_Cell'>
                                                {item.dirName}
                                            </TableCell>
                                            <TableCell className='TableDelete_Body_Row_Cell'>
                                                {item.nameTopic}
                                            </TableCell>
                                            <TableCell className='TableDelete_Body_Row_Cell'>
                                                {item.question}
                                            </TableCell>
                                            <TableCell className='TableDelete_Body_Row_Cell'>
                                                {item.buttonDel}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                                }
                            </TableBody>
                        </Table>
                    </Grid>

                </div>
            </SwipeableDrawer>



        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteContentTopic)
