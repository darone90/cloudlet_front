import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../features/login-slice';
import { getSession, setSession } from '../../../global/login-functions';
import { Link } from 'react-router-dom';
import { ButtonSize } from '../../../types/components.type';
import { loginFunction } from '../../../global/login-functions';
import { Login } from '../../../types/login.types';

import Button from '../../../components/common/button/Button';
import Spinner from '../../../components/common/spinner/Spinner';

import './SignIn.scss';



interface ForLogin {
    login: string;
    password: string;
};

const SignIn = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false)
    const [info, setInfo] = useState<string>('');
    const [loginData, setLoginData] = useState<ForLogin>({
        login: '',
        password: ''
    });

    useEffect(() => {
        const data = getSession();
        dispatch(appLogin({ loginStatus: data.login, token: data.token }));
    }, [dispatch]);

    const loginHandler = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setLoading(true)
        const data = await loginFunction(loginData) as Login
        setLoading(false)

        if (data.login === true) {
            setSession(data);
            dispatch(appLogin({ loginStatus: data.login, token: data.token }));
        } else {
            setInfo('niepoprawny login lub hasło')
        }

    };

    const addLoginData = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    if (loading) return <Spinner />;

    return (
        <div className='login'>
            <h1>Witaj w chmurce!</h1>
            <form className='login__form'>
                <h2>Logowanie:</h2>
                <label>
                    Login:
                    <input type="text" value={loginData.login} name='login' onChange={addLoginData} />
                </label>
                <label>
                    Hasło:
                    <input type="password" value={loginData.password} name='password' onChange={addLoginData} />
                </label>
                <Button text='Zaloguj' size={ButtonSize.Small} func={loginHandler} />
                <div className="login__form--info">
                    {info}
                </div>
            </form>
            <div className="login__account">
                <strong>Nie posiadasz jeszcze konta ? Załóż je!</strong>
                <button><Link to={'/signup'} >Załóż konto </Link></button>
            </div>
            <div className="login__extras">
                <p>Zapomniałeś hasła?</p>
                <button><Link to={'/reset'} >Resetuj hasło</Link></button>
                <p>Link aktywacyjny nie dotarł?</p>
                <button><Link to={'/resend'} >Generuj nowy link</Link></button>
            </div>
        </div>
    )
}

export default SignIn