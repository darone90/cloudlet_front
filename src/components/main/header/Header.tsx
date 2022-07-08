import React, { useEffect, useState } from 'react';
import { getSession } from '../../../global/login-functions';

import Indicator from './DataLimitIndicator';

import './Header.scss';

import logo from './cloud.png'

const Header = () => {

    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const { user } = getSession();
        setUserName(user as string)
    }, []);

    return (
        <div className='Header'>
            <h1>Chmurka</h1>
            <h3>Twoje miejsce w sieci</h3>
            <div className="Header__logo">
                <img src={logo} alt="Cloud" />
            </div>
            <small className='Header__small'>Witaj {userName}</small>
            <Indicator first={5} second={20} />
        </div>
    );
};

export default Header