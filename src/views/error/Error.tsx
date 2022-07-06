import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Error = () => {

    const { info } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            Error {info}
            <button onClick={() => navigate(-1)}>Powrót</button>
        </div>
    )
}

export default Error
