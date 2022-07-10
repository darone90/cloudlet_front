import React, { useState, ChangeEvent } from 'react';
import { ButtonSize } from '../../../../types/components.type';
import { sendFile } from '../../../../global/files-functions';
import { useDispatch } from 'react-redux';
import { formatChange } from '../../../../global/files-functions';
import { addFile } from '../../../../features/files-slice';
import { getSession } from '../../../../global/login-functions';

import Button from '../../../common/button/Button';
import Spinner from '../../../common/spinner/Spinner';

import './Uploadfile.scss';


const UploadFiles = () => {

    const dispatch = useDispatch()

    const [isFile, setIsFile] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [info, setInfo] = useState<string>('Dodaj plik aby uzyskać informację');
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
        formData.append('type', 'file');
        formData.append('token', getSession().token as string)

        setLoading(true);
        const response = await sendFile('files', formData);
        setLoading(false);

        if (response.status === true) {
            const data = formatChange(file as File, response.info);

            dispatch(addFile(data));
            setInfo('Plik został przesłany poprawnie');
            setFile(null);
            setIsFile(false);
        } else {
            window.location.href = `/error/${response.info}`
        }

    }

    if (loading) return <Spinner />;

    return (
        <div className='Upload-file'>
            <p>Dodaj plik do swoje chmurki</p>
            <p>Akceptowane formaty: PDF DOC DOCX XLS XLSX</p>
            <input type="file" name='file' multiple={false} onChange={fileHandler} accept=".pdf,.doc,.docx,.xls,.xlsx" />
            {isFile ?
                <div className="Upload-file__info">
                    <small>Nazwa: {file?.name}</small>
                    <small>Rozmiar: {Number(file?.size) / 1000000} Mb</small>
                    <Button text='Wyślij plik' size={ButtonSize.Small} func={fileSender} />
                </div>
                : <strong>{info}</strong>
            }
        </div>
    )
}

export default UploadFiles
