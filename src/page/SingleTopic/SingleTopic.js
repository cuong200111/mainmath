import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BreadCrumb from '../../components/brekCrumb'
import { Box, Grid } from '@mui/material'
import axios from 'axios'
import { apiKeys } from '../../config/api'


const SingleTopic = (props) => {
    const [indexTopic, setIndexTopic] = useState(0)
    const [optionTopic, setOptionTopic] = useState('Topic')
    const profileOnline = Boolean(localStorage.getItem('online')) ? Boolean(localStorage.getItem('online')) : null
    const navigate = useNavigate()
    const [expr, setExpr] = useState(null)
    const params = new URLSearchParams(window.location.search)
    const topicParam = params.get('topic') ? params.get('topic') : 'Topic'
    useEffect(() => {
        setOptionTopic(topicParam)
        setIndexTopic(topicParam==='Topic'?0:1)
    }, [topicParam])

    const topics = [
        { name: "Topic" },
        { name: "Exam" }

    ]


    useEffect(() => {
        if (Boolean(profileOnline)) {
            const funcAxios = async () => {
                const staticFile = await axios.get(`${apiKeys}/filePrivate?token=${localStorage.getItem('token')}`)
                if (staticFile.data.static) {
                    localStorage.setItem('staticFile', true)
                } else {
                    if (localStorage.getItem('staticFile')) {
                        localStorage.removeItem('staticFile')
                    }

                }
                const dataTopic = await axios.get(`${apiKeys}/getSingleTopic/${JSON.parse(localStorage.getItem('profile')).account}`)
                setExpr(dataTopic.data.data);
            }
            funcAxios()
        }
    }, [])

    return (
        <div className='Topics'>
            <Grid container className='Topics_top'>
                <h1 style={{ fontSize: "28px" }}>Topics</h1>
            </Grid>
            <Grid container className='Topics_between'>

                <Box className='Topics_between_box2'>
                    <Grid className='Topics_between_box2_top'>
                        <span >Choose one</span>
                    </Grid>
                    <Grid className='Topics_between_box2_bottom'>
                        <Grid className='Topics_between_box1_bottom' container style={{ padding: "30px 0px" }}>
                            {topics.map((item, index) => (
                                <div onClick={() => {
                                    setIndexTopic(index)
                                    navigate(`/singleTopic?topic=${item.name}`)
                                }}
                                    className='Topics_between_box1_bottom_content'
                                    style={{
                                        margin: "0px 20px 0 0px", backgroundColor: indexTopic === index ? '#155f75' :
                                            '', color: indexTopic === index ? 'white' : 'black'
                                    }} key={index}>{item.name}
                                </div>))
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid container justifyContent="space-between" className='Topics_bottom'>
                <Box className='Topics_bottom_Box'>
                    <Grid className='Topics_bottom_Box_Content' container  >
                        {expr ? expr[optionTopic].map((item, index) => {


                            return (<Grid key={index} item xs={2} onClick={() => {
                                navigate(`/singleExercise?Topic=${optionTopic}&id=${item.title}`)
                            }} className='Topics_bottom_Box_Content_items'>
                                <h1>

                                    {item.length > 10 ? `${item.title.slice(0, 10)}...` : `${item.title.slice(0, 10)}`}
                                </h1>
                                <span className='test'>
                                    {item.description > 200 ? `${item.description.slice(0, 200)}...` : `${item.description.slice(0, 200)}`}

                                </span>
                            </Grid>)
                        }) : null}

                    </Grid>
                </Box>

            </Grid>
        </div>
    )
}
export default SingleTopic