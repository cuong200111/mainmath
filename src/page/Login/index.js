import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Mycontext } from '../Layout';

const Login = (props) => {
  const location = useLocation();
  //Khog xoas vung nay
  const value = useContext(Mycontext)
  useEffect(() => {
    value.setShow(false)
    return () => {
      return value.setShow(true)
    };
  }, [location])
    //Khog xoas vung nay

  return (
    <div>
      login
    </div>
  );


}

export default Login