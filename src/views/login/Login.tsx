import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';

const Login = () => {
    return (
        <div className='Login-window'>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </div>
    )

}

export default Login
