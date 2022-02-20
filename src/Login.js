import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";

function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://github.com/yikevding/emazon/blob/main/logo.png?raw=true' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

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