import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../features/login-slice';
import { setSession } from '../../../global/login-functions';

const Menu = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        setSession({ token: null, user: null, login: false });
        dispatch(appLogin({ loginStatus: false, token: null }));
        window.location.href = '/'
    }

    return (
        <div className='Menu-main'>
            <h2>MENU</h2>
            <ul>
                <li>
                    <Link to={'/'} >Dokumenty </Link>
                </li>
                <li>
                    <Link to={'/notes'} >Notatki </Link>
                </li>
                <li>
                    <Link to={'/callendar'} >Kalnedarz </Link>
                </li>
                <li>
                    <Link to={'/user'} >Zmiana danych </Link>
                </li>
                <li onClick={logoutHandler}>
                    Wyloguj
                </li>
            </ul>
        </div>
    )
}

export default Menu
