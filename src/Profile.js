import React from 'react'
import './Profile.css'
import { Link, useHistory } from "react-router-dom"
import Product from "./UserProduct";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from "react";


function Profile(){
    const history = useHistory();
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const u = jwtDecode(token)
            setUser(u)
            if (!u) {
                localStorage.removeItem('token')
                history.replace('/login')
            } else {
                console.log(u.email)
                fetch(`http://emazon-backend.herokuapp.com/api/products/email/${u.email}`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setProducts(responseJson.data);
                    });
                console.log("fetch working")
            }
        }
    }, []);


    return(
        <div className='profile'>
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
                        User's Occupation(eg. Student, Faculty, etc.)
                    </div>

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
                            <PhoneEnabledIcon/> User's Phone #
                        </p>

                        <p className='email'>
                            <EmailIcon/> {user.email}
                        </p>
                        
                        <div className='user_bio'>
                            <p className='bio'>
                                Hello, my name is Jason. I'm a junior at Emory University.
                                My major is Computer Science. I live at Highland Lake. 
                                Hopefully, there is something that you need.
                            </p>
                        </div>

                        <div className='profile_buttons'>
                            <button className='chat_button'>
                                <ChatIcon/> Chat
                            </button>

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