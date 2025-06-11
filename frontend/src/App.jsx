import React from "react"
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'

import Issue from "./pages/Issue"
import View from "./pages/View"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to = "/issue"/>}/>   
        <Route path='/issue' element={<Issue/>}/>
        <Route path='/home' element={<View/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
