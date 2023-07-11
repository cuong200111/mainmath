import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routesAdmin from '../routesAdmin'

const RouterAdmins = () => {
    return (
        
            <Routes>
                {
                    routesAdmin.map((router, index) => (
                        <Route
                            key={index}
                            path={router.path}
                            exact={router.exact}
                            Component={router.main}
                            pathRoutes={'1'}
                        />
                    ))

                }
            </Routes>
       
    )
}

export default RouterAdmins