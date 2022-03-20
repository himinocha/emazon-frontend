import React from 'react'
import './Profile.css'
import {Link} from "react-router-dom"
import Product from "./Product";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


function Profile(){

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
                        User's Name
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

                        <p>
                            <EmailIcon/> User's Email
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

                            <button className='sell_button'>
                                <AddIcon/> Sell
                            </button>
                        </div>
                    </div>
                </div>

                <div className='right_side'>

                    <div className='row_one'>
                        {/* <Product
                            title="Classical Comfortable Grey Sofa"
                            price={1399.99}
                            rating={5}
                            image="https://github.com/yikevding/emazon/blob/main/image/sofa.jpeg?raw=true"
                        /> */}
                    </div>
                </div>

            </div>
        </div>
    )


}

export default Profile