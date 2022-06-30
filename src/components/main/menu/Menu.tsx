import React from 'react';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../features/login-slice';
import { setSession } from '../../../global/login-functions';

const Menu = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        setSession({ token: null, user: null, login: false });
        dispatch(appLogin({ loginStatus: false, token: null }));
    }

    return (
        <div className='Menu-main'>
            <h2>MENU</h2>
            <ul>
                <li>
                    Dokumenty
                </li>
                <li>
                    Notatki
                </li>
                <li>
                    Kalendarz
                </li>
                <li>
                    Zmiana danych logowania
                </li>
                <li onClick={logoutHandler}>
                    Wyloguj
                </li>
            </ul>
        </div>
    )
}

export default Menu
