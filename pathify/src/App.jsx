import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        {<Navbar/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
