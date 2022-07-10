import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Error.scss';

const Error = () => {

    const { info } = useParams();
    const navigate = useNavigate();

    return (
        <div className='Error'>
            <strong>Error {info}</strong>
            <button onClick={() => navigate(-1)}>Powrót</button>
        </div>
    )
}

export default Error
