import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import Foto from './parts/Foto';

import './Gallery.scss';



const Gallery = () => {

    const { fotos } = useSelector((store: RootState) => store.fotos);

    const list = fotos.map((foto, index) => <Foto file={foto} key={index} />);

    return (
        <div className='Gallery'>
            {list}
        </div>
    )
}

export default Gallery
