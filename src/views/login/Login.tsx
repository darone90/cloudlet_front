import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import Error from '../error/Error';
import Reset from './reset/Reset';
import Resend from './resend/Resend';
import NewPassword from './reset/NewPassword';

const Login = () => {
    return (
        <div className='Login-window'>
            <Routes>
                <Route path='signup' element={<SignUp />} />
                <Route path='error/:info' element={<Error />} />
                <Route path='*' element={<SignIn />} />
                <Route path='reset/' element={<Reset />} />
                <Route path='reset/:code' element={<NewPassword />} />
                <Route path='resend/' element={<Resend />} />
            </Routes>
        </div>
    )

}

export default Login
