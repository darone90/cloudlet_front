import React from 'react';
import './Spinner.scss';

const Spinner = () => {
    return (
        <div className='Spinner'>
            <h1>Ładowanie...</h1>
            <div className="Spinner__loading"></div>
        </div>
    )
}

export default Spinner;