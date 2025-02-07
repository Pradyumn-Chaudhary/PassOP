import { useState } from 'react'
import Navbar from './Component/Navbar'
import Manager from './Component/Manager'
import SourceCode from './Component/Footer'
import Footer from './Component/Footer'

function App() {
  
  return (
    <div className='relative h-screen '>
      <Navbar/>
      <Manager />
      <Footer/>
    </div>
  )
}

export default App
