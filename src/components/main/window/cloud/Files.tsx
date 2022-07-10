import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import File from './parts/File';

import './Files.scss';

const Files = () => {

    const { files } = useSelector((store: RootState) => store.files);

    const list = files.map((file, index) => <File file={file} key={index} />);


    return (
        <div className='Files'>
            <h2>Twoje pliki w chmurce: </h2>
            {list.length < 1 ? 'Brak plików w bazie' : list}
        </div>
    )
}

export default Files
