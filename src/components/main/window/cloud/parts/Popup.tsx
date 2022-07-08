import React from 'react';
import { useParams } from 'react-router-dom';

const Popup = () => {

    const { id } = useParams();


    return (
        <div className='Popup'>
            {id}
        </div>
    );
};

export default Popup;