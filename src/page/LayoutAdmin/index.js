import React, { createContext, useState } from 'react'

import RouterAdmins from '../RouterAdmin'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { Grid } from '@mui/material'
import NavBarAdmin from '../dasboard/NavBarAdmin'
import HeaderAdmin from '../dasboard/HeaderAdmin'

const LayoutAdmin = () => {


    return (
        <BrowserRouter>

            <Grid style={{ width: "100vw", height: "100vh" ,display:"flex"}}>
                <Grid width="10%" height="100%">
                    <NavBarAdmin />
                </Grid>
                <Grid width="90%" height="100%">
                    <HeaderAdmin />
                    <RouterAdmins />
                </Grid>
            </Grid>

        </BrowserRouter>


    )
}

export default LayoutAdmin