import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link, useHistory} from "react-router-dom"
import { useStateValue } from "./StateProvider";
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import SearchResults from "./SearchResult"

function Header({setResult}) {
    const history = useHistory();
    const [{ basket }] = useStateValue();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState([])
    const location = useLocation()
    // const {text} = location.data

    console.log(basket);

    function setR(){
        setResult(data)
    }

    function getData(val){
        setData(val.target.value)
        // setResult(val.target.value)
        //console.warn(val.target.value)
    }

    

    useEffect(() => {
        if (token) {
            const u = jwtDecode(token);
            setUser(u)
            setIsLoggedIn(true);

            if (!u) {
                localStorage.removeItem('token')
            }

        }
    
    }, []);
    
    const logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        history.replace('/Home')
    }
    

  return (
    <div className='header'>
        <Link to="/Home">
        <img 
        className='header__logo'
        src="https://github.com/yikevding/emazon/blob/main/image/logo.png?raw=true"
        alt=""
        />
        </Link>

        <div className='header__search'>
            <input className='header__searchInput'
            type="text" onChange={getData}/>
            <Link to='/SearchResult' onClick={setR}>
            <SearchIcon className='header__searchIcon'/>
            </Link>

        </div>

        <div className='header__nav'>
            
            
                {!isLoggedIn ? <> <Link to="/Login">
                    <div className='header__option'>
                        <span className='header__optionLineOne'>
                            Hello Guest
                        </span>

                        <span className='header__optionLineTwo'>
                            Sign in
                        </span>
                    </div> </Link> </> : <> <Link to='/' onClick={logout}>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>
                            Hello {user.firstName}
                        </span>

                        <span className='header__optionLineTwo'>
                            Sign Out
                        </span>
                    </div>
                    </Link> </>}
                
            
            {!isLoggedIn ? <>
            <Link to='/Login'>
            <div className='header__option'>
                <span className='header__optionLineOne'>
                    Your
                </span>

                <span className='header__optionLineTwo'>
                    Account
                </span>
            </div>
            </Link></> : <>
            <Link to='/Profile'>
            <div className='header__option'>
                <span className='header__optionLineOne'>
                    Your
                </span>

                <span className='header__optionLineTwo'>
                    Account
                </span>
            </div>
            </Link></> }

            <Link to="/wishlist">
            <div className='header__optionCart'>
                <ShoppingCartIcon />
                <span className='header__optionLineTwo
                 header__cartCount'>{basket?.length}</span>
            </div>
            </Link>
            
        </div>
    </div>
  )
}

export default Header