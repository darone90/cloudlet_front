import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../features/login-slice';
import { getSession, setSession } from '../../../global/login-functions';
import { Link } from 'react-router-dom';

interface ForLogin {
    login: string;
    password: string;
};

const SignIn = () => {

    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState<ForLogin>({
        login: '',
        password: ''
    });

    useEffect(() => {
        const data = getSession();
        dispatch(appLogin({ loginStatus: data.login, token: data.token }));
    }, [dispatch]);

    const loginHandler = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();

        // chiwlowo 
        const obj = {
            token: '1245',
            login: true,
            user: 'Jam Kotełki',
        }
        setSession(obj);
        dispatch(appLogin({ loginStatus: obj.login, token: obj.token }));
    };

    const addLoginData = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className='login'>
            <form className='login__form'>
                <label>
                    Login:
                    <input type="text" value={loginData.login} name='login' onChange={addLoginData} />
                </label>
                <label>
                    Hasło:
                    <input type="password" value={loginData.password} name='password' onChange={addLoginData} />
                </label>
                <button onClick={loginHandler}>Zaloguj</button>
            </form>
            <div className="login__account">
                <strong>Nie posiadasz jeszcze konta ? Załóż je!</strong>
                <button><Link to={'/signup'} >Załóż konto </Link></button>
            </div>
        </div>
    )
}

export default SignIn