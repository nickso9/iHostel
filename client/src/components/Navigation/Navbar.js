import React from 'react';
import Auth from '../Auth/Auth'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/LogoO.png'

const Navbar = () => {
    return (
        <header id='header'>
            <Link to='/'><img alt='logo' src={Logo} /><span>ibnb</span></Link>
            <Auth />
        </header>
    )
}


export default Navbar