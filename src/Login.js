import React, { useState } from 'react';
import './Login.css'
import { Link } from "react-router-dom";

function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('https://emazon-backend.herokuapp.com/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

        if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/Profile'
		} else {
			alert('Please check your username and password')
		}
	}

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://github.com/yikevding/emazon/blob/main/image/logo.png?raw=true' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form onSubmit={loginUser}>
                    <h5>E-mail</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing in, you agree to the EMAZON Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <Link to="/CreateAccount">
                <button className='login__registerButton'>Create your Emazon Account</button>
                </Link>
            </div>
        </div>
    )
}

export default Login