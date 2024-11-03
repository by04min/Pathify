import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'

function App() {

  return (
    <div className='app'>
      {<Navbar/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
