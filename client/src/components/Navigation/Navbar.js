import React from 'react';
import AuthOptions from '../Auth/Auth'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/LogoO.png'

const Navbar = () => {
    return (
        <header id='header'>
            <Link to='/' className='logoLink' ><img alt='logo' src={Logo} /><span>ibnb</span></Link>
            <AuthOptions />
        </header>
    )
}



export default Navbar