import React, { createContext, useState } from 'react'
import App from '../../app'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Router from '../Router'
import { BrowserRouter, useLocation } from 'react-router-dom'
import BreadCrumb from '../../components/brekCrumb'
export const Mycontext = createContext()
const Layout = () => {

    const [showPage, setShowPage] = useState(true)
    const [crumb, setCrumb] = useState('')
    const valueContext = { setShow: setShowPage,crumb:crumb,setCrumb:setCrumb }

    return (
        <Mycontext.Provider value={valueContext}>
            <BrowserRouter>
                {showPage ? <>
                    <Header />
                    <BreadCrumb /> </> : <></>}
<<<<<<< HEAD
                <Router />
=======
                <Router/>
>>>>>>> mainmathnew
                {showPage ? <Footer /> : <></>}
            </BrowserRouter>
        </Mycontext.Provider>

    )
}

export default Layout