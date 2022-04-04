import React, { useState } from 'react';
import './CreateAccount.css'
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';

function CreateAccount() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [description, setDescription] = useState('');
    const [occupation, setOccupation] = useState('');

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
    
    const history = useHistory()

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('https://emazon-backend.herokuapp.com/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName,
                lastName,
				email,
				password,
                phoneNumber,
                occupation,
                description
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/login')
		}
	}
    
    const options = [
        { value: 'student', label: 'Student' },
        { value: 'faculty', label: 'Faculty' }
        ]

    return (
        <div className='CreateAccount'>
            <Link to='/'>
                <img
                    className="CreateAccount_logo"
                    src='https://github.com/yikevding/emazon/blob/main/logo.png?raw=true' 
                />
            </Link>

            <div className='CreateAccount__container'>
                <h1>Create an Account</h1>

                <form onSubmit={registerUser}>
                     <h5>First Name</h5>
                    <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />

                    <h5>Last Name</h5>
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} />

                    <h5>E-mail</h5>
                    <input type='email' 
                    name = "email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} />
                    <div className="invalid-feedback">{errors.email?.message}</div>

                    <h5>Password</h5>
                    <input type='password' 
                    value = {password} 
                    name = "password" {...register('password')} 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                    onChange={e => setPassword(e.target.value)} />
                    <div className="invalid-feedback">{errors.password?.message}</div>

                    <h5>Confirm Password</h5>
                    <input type='password' 
                    value={confirmPassword} 
                    name = "confirmPassword" {...register('confirmPassword')} 
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                    onChange={e => setConfirmPassword(e.target.value)} />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>

                    <h5>Phone Number</h5>
                    <input type='tel' 
                    name = "phoneNumber" 
                    value={phoneNumber} 
                    onChange={e => setPhoneNumber(e.target.value)} />

                    <h5>Occupation</h5>
                    <Select
                        name="occupation"
                        options={options}
                        className="selectBox"
                        classNamePrefix="select"
                        onChange={e =>setOccupation(e.value)}
                    />   

                    <h5>Description</h5>
                    <input type='text' 
                    name = "Description" 
                    value={description} 
                    placeholder='Enter a description here!'
                    onChange={e =>setDescription(e.target.value)} />

                    <div className="invalid-feedback">{errors.email?.message}</div>
                    <button type='submit' className='CreateAccount__signInButton'>Register</button>
                </form>

                <p>
                    By registering for an account, you agree to the EMAZON Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
            </div>
        </div>
    )
}


export default CreateAccount