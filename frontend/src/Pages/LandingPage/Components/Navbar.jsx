import React from 'react'
import Logo from '../../../assets/Logo.svg'
import './Navbar.css'
function Navbar() {
  return (
    <div className='Nav'>
        
            <img src={Logo} alt='Logo' className='Logo'/>
        
        <div className='Nav_bttns'>
            <div className='Register Nav_Box'>REGISTER</div>
            <div className='Login Nav_Box'>LOGIN</div>
        </div>
    </div>
  )
}

export default Navbar