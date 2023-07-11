
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Mycontext } from '../Layout';
import { Button, Checkbox, Fab, FilledInput, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import axios from 'axios';
import { apiKeys } from '../../config/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SnackbarRegister } from '../../components/Snackbar';
const Login = (props) => {
  //Khog xoas vung nay
  const value = useContext(Mycontext)
  useEffect(() => {
    value.setShow(false)
    return () => {
      return value.setShow(true)
    };
  }, [value])
  //Khog xoas vung nay
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkSavePass, setcheckSavePass] = useState(false);
  const [msgRegister, setMsgRegister] = useState(null)
  const [varianMsg, setVarianMsg] = useState(null)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  if (Boolean(localStorage.getItem("online"))) {
    window.location.href = '/'
  }
  useEffect(() => {
    if (localStorage.getItem('savePass')) {
      const { account, password } = JSON.parse(localStorage.getItem('savePass'))
      setUsername(account)
      setPassword(password)
      setcheckSavePass(true)
    } else {
      setUsername('')
      setPassword('')
      setcheckSavePass(false)
    }
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username !== 'admin' || password !== '123') {
      const resultApi = await axios.post(`${apiKeys}/loginPrivate`, { username, password })
      if (resultApi.data.activeLogin === true) {
        localStorage.setItem('token', resultApi.data.token)
        localStorage.setItem('online', true)
        localStorage.setItem('profile', JSON.stringify({ account: resultApi.data.account }))
        setMsgRegister(resultApi.data.msg)
        setVarianMsg('success')

        if (checkSavePass) {
          localStorage.setItem('savePass', JSON.stringify({ account: resultApi.data.account, password: resultApi.data.password }))
        } else {
          if (localStorage.getItem('savePass')) {
            localStorage.removeItem('savePass')
          }
        }
        setTimeout(() => {
          window.location.href = '/'
        }, 1500);
      } else {
        setTimeout(() => {
          setMsgRegister(null)
        }, 2000);
        setMsgRegister(resultApi.data.msg)
        setVarianMsg('error')
        localStorage.setItem('token', '')
      }
    } else {
      localStorage.setItem('admin',true)
      window.location.href = '/'
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

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (


    <Grid className='Main_Login' style={{ height: "100vh", width: "100vw" }} item container justifyContent={'center'} alignItems={'center'} >
      <form className='Main_Login_form' onSubmit={handleSubmit} style={{
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
          className='Main_Login_form_user'
          id="username"
          placeholder="Tài khoản"
          value={username}
          onChange={handleUsernameChange}
          autoComplete='name'
        />
        <OutlinedInput

          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          className='Main_Login_form_password'
          id="password"
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          autoComplete='password'
        />
        <Grid className='Main_Login_form_savepass' display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
          <Checkbox checked={checkSavePass} onChange={(e) => {
            setcheckSavePass(e.target.checked);
          }} style={{ padding: "0", color: "#ff0061e6" }} />
          <span style={{ marginLeft: "5px", fontFamily: "sans-serif", color: "gray" }}>Nhớ mật khẩu</span>
        </Grid>
        <Button
          className='Main_Login_form_button'
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#ff0061e6",
            borderRadius: "1px",
            marginTop: "5%"
          }}
        >

          Đăng nhập
        </Button>
      </form>
      {Boolean(msgRegister) ? SnackbarRegister({ msg: msgRegister, variant: varianMsg }) : null}
    </Grid>


  );


}

export default Login


