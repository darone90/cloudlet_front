import React from 'react';
import { useParams } from 'react-router-dom';

const Error = () => {

    const { info } = useParams();

    return (
        <div>
            Error {info}
        </div>
    )
}

export default Error
