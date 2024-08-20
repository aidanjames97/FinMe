import React, { useState } from 'react'
import { Link } from 'react-scroll'
import { NavLink as RouterLink} from 'react-router-dom'

import Logo from "../../images/goeLogo.png"
import Home from "../../images/home.png"
import About from "../../images/information.png"
import Services from "../../images/services.png"
import Github from "../../images/github.png"
import WWW from "../../images/world-wide-web.png"
import Menu from "../../images/menu.png"

const Header = () =>{
    const [displayMenu, setDisplayMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

  return (
        <nav className='fixed top-0 w-full z-10 backdrop-blur-sm bg-white/10'>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button 
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    <img src={Menu} alt='menu' className='h-6'/>
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                    <img className="h-11 w-auto" src={Logo} alt="Logo"/>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    <Link 
                        className="rounded-md px-3 py-2 hover:bg-violet-600 transition duration-500 hover:cursor-pointer" aria-current="page"
                        to='home'
                        smooth='true'
                        duration={500}
                    >
                        <img src={Home} alt='Home' className='h-7'/>
                    </Link>
                    <Link 
                        className="rounded-md px-3 py-2 hover:bg-violet-600 transition duration-500 hover:cursor-pointer"
                        to='about'
                        smooth='true'
                        duration={500}
                    >
                        <img src={About} alt='About' className='h-7'/>
                    </Link>
                    <Link 
                        className="rounded-md px-3 py-2 hover:bg-violet-600 transition duration-500 hover:cursor-pointer"
                        to='services'
                        smooth='true'
                        duration={500}
                    >
                        <img src={Services} alt='Services' className='h-7'/>
                    </Link>
                    <span className='h-11 w-0.5 bg-violet-600 rounded'></span>
                    <Link 
                        className="rounded-md px-3 py-2 hover:bg-violet-600 transition duration-500 hover:cursor-pointer"
                        to='https://github.com/aidanjames97'
                    >
                        <img src={Github} alt='Github' className='h-7'/>
                    </Link>
                    <Link 
                        className="rounded-md px-3 py-2 hover:bg-violet-600 transition duration-500 hover:cursor-pointer"
                        to='https://aidanjames.ca/'
                    >
                        <img src={WWW} alt='Website' className='h-7'/>
                    </Link>
                </div>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative ml-3">
                <div>
                    <button 
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                        onClick={() => setDisplayMenu(!displayMenu)}
                    >
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                    </button>
                </div>

                {displayMenu ? (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                        <RouterLink 
                            className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-black/10 transition duration=500" role="menuitem" id="user-menu-item-0"
                            to='/profile'
                        >Profile</RouterLink>
                        <RouterLink 
                            className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-black/10 transition duration=500" role="menuitem" id="user-menu-item-1"
                            to='/register'
                        >Register</RouterLink>
                        <RouterLink 
                            className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-black/10 transition duration=500" role="menuitem" id="user-menu-item-2"
                            to='/login'
                        >Login</RouterLink>
                    </div>
                ) : (
                    <></>
                )}
                </div>
            </div>
            </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
            {mobileMenu ? (
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link 
                        className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page"
                        to='home'
                        smooth='true'
                        duration={500}
                    >Home</Link>
                    <Link 
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        to='about'
                        smooth='true'
                        duration={500}
                    >About</Link>
                    <Link 
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        to='services'
                        smooth='true'
                        duration={500}
                    >Services</Link>
                </div>
            ) : (
                <></>
            )}
        </div>
    </nav>
  )
}

export default Header