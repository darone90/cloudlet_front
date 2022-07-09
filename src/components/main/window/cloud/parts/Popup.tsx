import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Popup = () => {

    const { id } = useParams();

    const [img, setImg] = useState<string>('');

    const getImage = async () => {
        const res = await fetch(`http://localhost:8080/files/file/${id}`);
        const blob = await res.blob();
        const objectURL = URL.createObjectURL(blob);
        setImg(objectURL);
    }

    useEffect(() => {
        (async () => {
            await getImage()
        })()
    }, []);

    return (
        <div className='Popup'>
            <img src={img} alt={id} />
        </div>
    );
};

export default Popup;