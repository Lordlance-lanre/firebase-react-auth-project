import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

function App() {
  return ( 
      <div>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
       </Routes>
      </div>
  )
}

export default App
