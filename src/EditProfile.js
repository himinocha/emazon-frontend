import React, { useState } from 'react';
import './EditProfile.css'
import {Link} from "react-router-dom"
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function Profile(){
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
            
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

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

                        <p className='email'>
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

                                <Link to ='/ItemUpload'>
                                    <button className='sell_button'>
                                        <AddIcon/> Sell
                                    </button>
                                </Link>
                        </div>
                    </div>
                </div>

                <div className='right_side'>
                        <div className='detail_side'>
                            <h2>Edit Your Information</h2>    
                            <div class = "header-bottom"></div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h5>First Name</h5>
                                <input type='text' className='inputBox' placeholder='Andy' value={firstName} onChange={e => setFirstName(e.target.value)} />

                                <h5>Last Name</h5>
                                <input type='text' className='inputBox' placeholder='Chen' value={lastName} onChange={e => setLastName(e.target.value)} />
                                

                                <h5>E-mail</h5>
                                <input type='email' 
                                className='inputBox'
                                name = "email" 
                                value={email} 
                                placeholder='andychen@gmail.com'
                                onChange={e => setEmail(e.target.value)} />
                                <div className="invalid-feedback">{errors.email?.message}</div>

                                <h5>Phone Number</h5>
                                <input type='tel' 
                                name = "phoneNumber" 
                                className='inputBox'
                                value={phoneNumber} 
                                placeholder='123-457-3123'
                                onChange={e => setPhoneNumber(e.target.value)} />
                                <div className="invalid-feedback">{errors.email?.message}</div>

                                <h5>Description</h5>
                                <input type='text' 
                                name = "Description" 
                                className='description'
                                value={description} 
                                placeholder='Enter a description here!'
                                onChange={e =>setDescription(e.target.value)} />
                                <div className="invalid-feedback">{errors.email?.message}</div>

                                <Link to ="/Profile">
                                <button type='submit' className='CreateAccount__signInButton'>
                                    <HowToRegIcon/>
                                </button>
                                </Link>
                            </form>
                        </div>
                </div>

            </div>
        </div>
    )


}

export default Profile