import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import './App.css'

// import NavBar from './pages/Navbar.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'

function App() {

  return (
    <div className='app'>
      {/* <Navbar/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
