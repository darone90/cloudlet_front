import React, { useState, ChangeEvent } from 'react';
import { ButtonSize } from '../../../../types/components.type';
import { sendFile } from '../../../../global/files-functions';
import { useDispatch } from 'react-redux';
import { formatChange } from '../../../../global/files-functions';
import { addFoto } from '../../../../features/foto-slice';
import { getSession } from '../../../../global/login-functions';

import Button from '../../../common/button/Button';
import Spinner from '../../../common/spinner/Spinner';

import './Uploadfoto.scss';



const UploadFoto = () => {

    const dispatch = useDispatch();

    const [isFile, setIsFile] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [info, setInfo] = useState<string>('Dodaj zdjęcie aby uzyskać inforację');
    const [loading, setLoading] = useState<boolean>(false);

    const fileHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            const file = event.target.files[0]
            setFile(file);
            setIsFile(true);
        }
    }

    const fileSender = async () => {

        const formData = new FormData();
        formData.append('file', file as File);
        formData.append('type', 'foto');
        formData.append('token', getSession().token as string)

        setLoading(true);
        const response = await sendFile('files', formData);
        setLoading(false);

        if (response.status === true) {
            const data = formatChange(file as File, response.info);
            dispatch(addFoto(data))
            setInfo('Zdjęcie zostało poprawnie zapisane');
            setFile(null);
            setIsFile(false);
        } else {
            window.location.href = `/error/${response.info}`;
        }

    }

    if (loading) return <Spinner />;

    return (
        <div className='Upload-foto'>
            <p>Dodaj zdjęcia do swojej galerii. Akceptowane formaty: JPG PNG</p>
            <input type="file" name='file' multiple={false} onChange={fileHandler} accept=".jpg,.png" />
            {isFile ?
                <div className="Upload-foto__info">
                    <small>Nazwa: {file?.name}</small>
                    <small>Typ: {file?.type}</small>
                    <small>Rozmiar: {file?.size}</small>
                    <Button text='Wyślij plik' size={ButtonSize.Small} func={fileSender} />
                </div>
                : <strong>{info}</strong>
            }
        </div>
    )
}

export default UploadFoto;
