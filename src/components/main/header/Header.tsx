import React, { useEffect, useState } from 'react';
import { getSession } from '../../../global/login-functions';
import { getFreeSpace } from '../../../global/files-functions';
import { useNavigate } from 'react-router-dom';

import Indicator from './DataLimitIndicator';

import './Header.scss';

import logo from './cloud.png'


const Header = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>('');
    const [fileFreeSpace, setFileFreeSpace] = useState<number>(0);
    const [fotoFreeSpace, setFotoFreeSpace] = useState<number>(0);

    const freeSpace = async () => {
        try {
            const { user } = getSession();
            setUserName(user as string);
            const data = await getFreeSpace();
            setFileFreeSpace(data.fileSpace);
            setFotoFreeSpace(data.fotoSpace);
        } catch (err) {
            navigate('/error/błąd wczytywania ilości wolnego miejsca na dysku')
        }
    }

    useEffect(() => {
        (async () => {
            await freeSpace();
        })();
    });

    return (
        <div className='Header'>
            <h1>Chmurka</h1>
            <h3>Twoje miejsce w sieci</h3>
            <div className="Header__logo">
                <img src={logo} alt="Cloud" />
            </div>
            <small className='Header__small'>Witaj {userName}</small>
            <Indicator first={fileFreeSpace} second={fotoFreeSpace} />
        </div>
    );
};

export default Header