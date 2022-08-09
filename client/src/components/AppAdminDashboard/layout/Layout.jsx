import React from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import { Routes, Route } from "react-router-dom";



import DRoutes from '../Routes'

const Layout = () => {

    

    return (
        <Routes>
            <Route render={(props) => (
                <div className="layout">
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <DRoutes/>
                        </div>
                    </div>
                </div>
            )}/>
        </Routes>
    )
}

export default Layout; 
