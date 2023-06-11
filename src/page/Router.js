import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import router from '../routes'

const Router = () => {
    return (
        
            <Routes>
                {
                    router.map((router, index) => (
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

export default Router