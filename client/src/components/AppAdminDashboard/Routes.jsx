import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Dashboard from '../../pages/Dashboard'


const DRoutes = () => {
    return (
            <Routes>
            <Route path='/dashboard'  element={<Dashboard />}/>
            
            </Routes>
    )
}

export default DRoutes
