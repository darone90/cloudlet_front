import React, { useEffect, useState } from 'react';
import { getSession } from '../../../global/login-functions';
import { getFreeSpace } from '../../../global/files-functions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';


import Indicator from './DataLimitIndicator';

import './Header.scss';

import logo from './cloud.png'


const Header = () => {

    const { files } = useSelector((store: RootState) => store.files);
    const { fotos } = useSelector((store: RootState) => store.fotos);

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
            window.location.href = '/error/błąd wczytywania ilości wolnego miejsca na dysku';
        }
    }

    useEffect(() => {
        (async () => {
            await freeSpace();
        })();
    }, [files, fotos]);

    return (
        <div className='Header'>
            <h1>Chmurka</h1>
            <h3>Twoje miejsce w sieci</h3>
            <div className="Header__logo">
                <img src={logo} alt="Cloud" />
            </div>
            <small className='Header__small'>Witaj {userName}</small>
            <Indicator first={fileFreeSpace > 100 ? 100 : fileFreeSpace} second={fotoFreeSpace > 100 ? 100 : fotoFreeSpace} />
        </div>
    );
};

export default Header