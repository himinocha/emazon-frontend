import React from 'react'
import './Profile.css'
import { Link, useHistory } from "react-router-dom"
import Product from "./UserProduct";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from "react";


function Profile(){
    const history = useHistory();
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (token) {
            const u = jwtDecode(token)
            setUser(u)
            setIsLoggedIn(true);
            if (!u) {
                localStorage.removeItem('token')
                history.replace('/login')
            } else {
                fetch("https://emazon-backend.herokuapp.com/api/products/email", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: u.email,
                    }),
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    setProducts(responseJson.data);
                });
            }
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        history.replace('/Home')
    }

    return(
        <div className='profile'>
            <img className='profile_background'
            src="https://github.com/yikevding/emazon/blob/main/image/profile_background.jpeg?raw=true"
            alt="">
            </img>
            <div className='profile_header'>
                <div className='profile_image'>
                    <img 
                    src='https://github.com/yikevding/emazon/blob/main/emory.jpeg?raw=true'
                    width={200}/>
                </div>

                <div className='profile_info'>
                    <h3 className='user_name'>
                        {user.firstName} {user.lastName}
                    </h3>

                    <div className='occupation'>
                        {user.occupation}
                    </div>

                    <Link to='/Home'>
                        <button className='signout_button' onClickCapture={logout}>
                            <LogoutIcon/> Sign out
                        </button>
                    </Link>

                    <Link to='/EditProfile'>
                        <button className='edit_profile_button'>
                            <EditIcon/> Edit Profile
                        </button>
                    </Link>

                </div>
            </div>

            <div className='profile_main_body'>
                <div className='left_side'>
                    <div className='info_side'>
                        <p className='phone_number'>
                            <PhoneEnabledIcon/> {user.phoneNumber}
                        </p>

                        <p className='email'>
                            <EmailIcon/> {user.email}
                        </p>
                        
                        <div className='user_bio'>
                            <p className='bio'>
                                {user.description}
                            </p>
                        </div>

                        <div className='profile_buttons'>
                            
                            <Link to ='/DirectChatPage'>
                                <button className='chat_button'>
                                    <ChatIcon/> Chat
                                </button>
                            </Link>

                            
                            
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <Link to ='/ItemUpload'>
                                <button className='sell_button'>
                                    <AddIcon/> Sell
                                </button>
                            </Link>


                        </div>
                    </div>
                </div>

                <div className='right_side'>
                    <div className="home__row">
                        {products.map((product, i) => (
                            <Product
                            id={product._id}
                            title={product.name}
                            price={product.price}
                            rating={product.rating}
                            image={product.image}
                            />
                        ))}
                    </div>

                    {/* <div className='row_one'>
                        <Product
                            title="ogg"
                            price={999.99}
                            rating={5}
                            image="https://github.com/yikevding/emazon/blob/main/image/sofa.jpeg?raw=true"
                        />
                        <Product
                            title="Advanced Gaming Chair"
                            price={299.99}
                            rating={4}
                            image="https://github.com/yikevding/emazon/blob/main/image/gaming%20chair.jpeg?raw=true"
                        />
                    </div> */}
                </div>

            </div>
        </div>
    )


}

export default Profile