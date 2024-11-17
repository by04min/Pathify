import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './pages/AuthContext.jsx'
import React from 'react'
import { gapi } from 'gapi-script'
import './App.css'

// import NavBar from './pages/Navbar.js'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Connection from './pages/Connection.jsx'
import Login from './pages/LogIn.jsx'

function App() {

  return (
    <div className='app'>
      {/* <Navbar/> */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/connection" element={<Connection/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
