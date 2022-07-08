import React, { useState } from 'react';
import { fileEntity } from '../../../../../types/files.type';
import { ButtonSize } from '../../../../../types/components.type';
import { deleteFileFromDatabase } from '../../../../../global/files-functions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFile } from '../../../../../features/files-slice';

import Spinner from '../../../../common/spinner/Spinner';
import Button from '../../../../common/button/Button';


interface Props {
    file: fileEntity
}

const Foto = (props: Props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { id, name, type, size } = props.file

    const [loading, setLoading] = useState<boolean>(false)

    const deleteHandle = async () => {
        setLoading(true);
        const income = await deleteFileFromDatabase(id);
        setLoading(false);

        if (income.status === true) {
            dispatch(deleteFile(id))
        } else {
            navigate(`/error/${income.info}`)
        }
    }

    const downloadHandle = async () => {

    }

    const showPopupHandle = () => {
        navigate(`/fotos/${id}`)
    }

    if (loading) return <Spinner />;

    return (
        <div className='Foto'>
            <h3>{name}</h3>
            <small>typ: {type}</small>
            <small>rozmiar: {size}</small>
            <Button text='Pobierz' size={ButtonSize.Small} func={downloadHandle} />
            <Button text='Usuń' size={ButtonSize.Small} func={deleteHandle} />
            <Button text='Podgląd' size={ButtonSize.Small} func={showPopupHandle} />
        </div>
    );
};

export default Foto;