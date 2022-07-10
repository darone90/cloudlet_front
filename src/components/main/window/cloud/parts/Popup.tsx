import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSession } from '../../../../../global/login-functions';

import './Popup.scss';

const Popup = () => {

    const { id } = useParams();
    const navigate = useNavigate()

    const [img, setImg] = useState<string>('');

    const getImage = async () => {
        try {
            const res = await fetch(`http://localhost:8080/files/file/${id}`, {
                method: 'GET',
                headers: {
                    'Token': String(getSession().token),
                    'Name': encodeURIComponent(String(getSession().user))
                },
            });
            const blob = await res.blob();
            const objectURL = URL.createObjectURL(blob);
            setImg(objectURL);          
        } catch (err) {
            console.log(err)
            window.location.href = `/error/${(err as Error).message}`
        }    
    }

    useEffect(() => {
        (async () => {
            await getImage()
        })()
    }, []);

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className='Popup'>
            <button onClick={goBack}>Powrót</button>
            <img src={img} alt={id} />
        </div>
    );
};

export default Popup;