import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import { gapi } from 'gapi-script'
import './App.css'

// import NavBar from './pages/Navbar.js'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Authentication from './pages/Authentication.jsx'

function App() {

  return (
    <div className='app'>
      {/* <Navbar/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/auth" element={<Authentication/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
