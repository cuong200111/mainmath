import { Box, Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { apiKeys } from '../../../config/api'
import { Mycontext } from '../../Layout'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { SnackbarRegister } from '../../../components/Snackbar'
const RegisterPrivate = (props) => {
    const value = useContext(Mycontext)

    // khong xoa phan nay

    // khong xoa phan nay
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const [msgRegister, setMsgRegister] = useState(null)
    const [varianMsg, setVarianMsg] = useState(null)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const regiterPrivateData = await axios.post(`${apiKeys}/registerPrivate`, { username, password })
        if (regiterPrivateData.data.activeUser) {
            setMsgRegister(regiterPrivateData.data.msg)
            setVarianMsg('error')
        } else {
            setMsgRegister(regiterPrivateData.data.msg)
            setVarianMsg('success')
        }
    };
    const flexCss = (justifyContent, alignItem, flexDirection) => {
        return {
            display: 'flex',
            justifyContent,
            alignItem,
            flexDirection,
        }
    }


    return (
        <Grid className='Main_RegisterPrivate' style={{ height: "100%", width: "100%" }} item container justifyContent={'center'} alignItems={'center'} >
            <form className='Main_RegisterPrivate_form' onSubmit={handleSubmit} style={{
                ...flexCss('space-between', 'center', 'column'),
                height: "25%",
                width: "16%",
                boxShadow: "0px 0px 4px 2px #0000001a",
                padding: "5%",
                borderRadius: "5px",
                position: "relative"
            }}>
                <Grid className='Main_Login_form_security' style={{
                    position: "absolute", height: "50px",
                    width: "50px",
                    backgroundColor: "#ff0061e6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    top: "-8%",
                    left: "45%",
                    borderRadius: "100%"
                }}>
                    <VerifiedUserIcon style={{ color: "white", fontSize: "30px" }} />
                </Grid>
                <TextField
                    className='Main_RegisterPrivate_form_user'
                    id="username"
                    placeholder="Tài khoản"
                    value={username}
                    onChange={handleUsernameChange}
                    autoComplete='name'
                />
                <TextField
                    className='Main_RegisterPrivate_form_password'
                    id="password"
                    placeholder="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete='password'
                />

                <Button
                    className='Main_RegisterPrivate_form_button'
                    variant="contained"
                    type="submit"
                    style={{
                        backgroundColor: "#ff0061e6",
                        borderRadius: "1px",
                        marginTop: "5%"
                    }}
                >

                    Đăng ký
                </Button>
            </form>
            {Boolean(msgRegister) ? SnackbarRegister({ msg: msgRegister, variant: varianMsg }) : null}
        </Grid>
    )
}



export default RegisterPrivate
