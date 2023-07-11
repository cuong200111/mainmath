import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
const NavBarAdmin = (props) => {

    const [indexButton, setIndexButton] = useState(0)
    const dataButton = [
        {
            path: '/',
            name: 'Đăng ký tài khoản cho học sinh'
        },
        {
            path: '/addTopicSingle',
            name: 'Thêm chủ đề cho học sinh'
        },
        {
            path: '/addContentTopicSingle',
            name: 'Thêm dữ liệu cho chủ đề học sinh'
        },
        {
            path: '/deletesingletopic',
            name: 'Xóa chủ đề cho học sinh'
        },
        {
            path: '/addtopic',
            name: 'Thêm chủ đề chung'
        },
        {
            path: '/addcontenttopic',
            name: 'Thêm dữ liệu cho chủ đề chung'
        },
        {
            path: '/deletecontenttopic',
            name: 'Xóa chủ đề chung'
        }
    ]
    return (
        <Grid container justifyContent={"space-between"} height="100%" width="100%" style={{ backgroundColor: "#2E4EAD" }}>


            <Typography color={"white"} variant="h6" style={{ flexGrow: 1 }}>
                Quản trị viên
            </Typography>
            <Grid>

                {dataButton.map((item, index) => {
                    return (
                        <Button onClick={()=>{
                            setIndexButton(index)
                        }} key={index} style={{
                            backgroundColor: indexButton === index ? "white" : 'transparent',
                            color:  indexButton === index ? "black" : 'white',
                            border: indexButton === index ? "1px solid pink" : "1px solid",
                            marginTop: "5px", width: "95%"
                        }} component={Link} to={item.path}>
                            {item.name}
                        </Button>
                    )
                })}
            </Grid>
            <Typography onClick={() => {
                localStorage.removeItem('admin')
                window.location.href = './'
            }} color={"white"} variant="h6" style={{ flexGrow: 1, cursor: "pointer" }}>
                Đăng xuất
            </Typography>

        </Grid>
    )
}



export default NavBarAdmin
