import React from 'react';

import './DataLimitIndicator.scss'

interface Props {
    first: number;
    second: number;
}

const Indicator = (props: Props) => {

    const { first, second } = props;

    return (
        <div className='Indicator'>
            <small>Miejsce na pliki: {100 - first}%</small>
            <div className="Indicator__bar">
                <div className="Indicator__space" style={{ width: `${first}%` }}></div>
            </div>
            <small>Miejsce na zdjęcia: {100 - second}%</small>
            <div className="Indicator__bar">
                <div className="Indicator__space" style={{ width: `${second}%` }}></div>
            </div>
        </div>
    );
};

export default Indicator;
