import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import Error from '../error/Error';

const Login = () => {
    return (
        <div className='Login-window'>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/error/:info' element={<Error />} />
            </Routes>
        </div>
    )

}

export default Login
