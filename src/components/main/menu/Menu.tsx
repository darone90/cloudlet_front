import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../features/login-slice';
import { setSession } from '../../../global/login-functions';
import { ButtonSize } from '../../../types/components.type';

import Button from '../../common/button/Button';

import './Menu.scss'

const Menu = () => {

    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState<boolean>(false)

    const activeHandler = () => {
        setIsActive(prev => !prev)
    }

    const logoutHandler = () => {
        setSession({ token: null, user: null, login: false });
        dispatch(appLogin({ loginStatus: false, token: null }));
        window.location.href = '/'
    }

    return (
        <div className='Menu-main'>

            <Button text='Menu' size={ButtonSize.Big} func={activeHandler} exClass='Menu-main__activate' />

            <ul className={isActive ? 'active' : ''}>
                <li>
                    <Link to={'/'} onClick={activeHandler}>Dokumenty </Link>
                </li>
                <li>
                    <Link to={'/notes'} onClick={activeHandler}>Notatki </Link>
                </li>
                <li>
                    <Link to={'/callendar'} onClick={activeHandler}>Kalnedarz </Link>
                </li>
                <li>
                    <Link to={'/user'} onClick={activeHandler}>Użytkownik </Link>
                </li>
            </ul>

            <Button text='Wyloguj' size={ButtonSize.Big} func={logoutHandler} exClass={'Menu-main__logout'} />

        </div>
    )
}

export default Menu
