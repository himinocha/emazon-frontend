import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom"

function Header() {
  return (
    <div className='header'>
        <Link to='/'>
            <img 
            className='header__logo'
            src="https://github.com/yikevding/emazon/blob/main/logo.png?raw=true"
            />
        </Link>

        <div className='header__search'>
            <input className='header__searchInput'
            type="text"/>
            <SearchIcon className='header__searchIcon'/>
        </div>

        <div className='header__nav'>
            <Link to="/Login">
            <div className='header__option'>
                <span className='header__optionLineOne'>
                    Hello Guest
                </span>

                <span className='header__optionLineTwo'>
                    Sign in
                </span>
            </div>
            </Link>

            <div className='header__option'>
                <span className='header__optionLineOne'>
                    Your
                </span>

                <span className='header__optionLineTwo'>
                    Account
                </span>
            </div>

            <div className='header__optionCart'>
                <ShoppingCartIcon />
                <span className='header__optionLineTwo
                 header__cartCount'>0</span>
            </div>

            
        </div>
    </div>
  )
}

export default Header