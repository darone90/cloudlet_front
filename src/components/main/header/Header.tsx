import React from 'react';
import './Header.scss';

import logo from './cloud.png'

const Header = () => {
    return (
        <div className='Header'>
            <h1>Chmurka</h1>
            <h3>Twoje miejsce w sieci</h3>
            <div className="Header__logo">
                <img src={logo} alt="Cloud" />
            </div>
        </div>
    );
};

export default Header