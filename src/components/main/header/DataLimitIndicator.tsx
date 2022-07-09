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
            <small>Zapełnienie dysku: {first}%</small>
            <div className="Indicator__bar">
                <div className="Indicator__space" style={{ width: `${first}%` }}></div>
            </div>
            <small>Zapełnienie dysku: {second}%</small>
            <div className="Indicator__bar">
                <div className="Indicator__space" style={{ width: `${second}%` }}></div>
            </div>
        </div>
    );
};

export default Indicator;
