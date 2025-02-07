import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='<class="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-700 flex justify-around  px-2 text-white items-center'>
      <div className='logo font-bold text-2xl cursor-pointer'>
      <span className='text-green-700'>&lt;</span>
      Pass
      <span className='text-green-700'>OP/&gt;</span>
      </div>
          <ul className='md:flex gap-2 hidden'>
              <li className='hover:font-bold cursor-pointer'>Home</li>
              <li className='hover:font-bold cursor-pointer'>About</li>
              <li className='hover:font-bold cursor-pointer'>Contact</li>
        </ul>
        <button className="flex items-center gap-2 px-4 py-2 text-black font-bold bg-green-400 hover:bg-green-500 rounded-full
     transition left-3 border border-green-900 cursor-pointer" onClick={()=>window.open("https://github.com/Pradyumn-Chaudhary/PassOP","_blank")}>
      <img src="github.svg" alt="" />
      GitHub
    </button>
      </nav>
    </>
  )
}

export default Navbar
