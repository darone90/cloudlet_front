import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Note } from '../../../../types/notes.type';
import { getOneNote, listDeleter } from '../../../../global/notes-function';
import { ButtonSize } from '../../../../types/components.type';
import { deleteOne } from '../../../../features/notes-slice';

import Spinner from '../../../common/spinner/Spinner';
import Button from '../../../common/button/Button';
import { useDispatch } from 'react-redux';

import './Shownote.scss';

const ShowNote = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [note, setNote] = useState<Note>({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        delete: false,
        email: '',
        create: '',

    })

    const getNote = async () => {
        try {
            const data = await getOneNote('notes/get', id as string);
            if (data) setNote(data);
        } catch (err) {
            window.location.href = `/error/błąd podczas pobierania notatki.`
        }
    }

    useEffect(() => {
        (async () => {
            await getNote();
            setLoading(false);
        })()
    })

    const goBack = () => {
        navigate(-1)
    };

    const deleteHandler = async () => {
        try {
            setLoading(true);
            dispatch(deleteOne(id as string));
            const response = await listDeleter('notes/delete', id as string);
            setLoading(false);
            navigate(-1);
            if (response.status === false) {
                window.location.href = `/error/${response.info}`
            }
        } catch (err) {
            window.location.href = `/error/błąd podczas usuwania... ponów prubę za chwilę`;
        }
    };


    if (loading) return <Spinner />;

    return (
        <div className='Show-notes'>
            <h2>{note.title}</h2>
            <small>Utworzona: {note.create}</small>
            <p>{note.description}</p>
            {note.startDate ? <strong>Początek wydarzenia: {note.startDate}</strong> : null}
            {note.endDate ? <strong>Zakończenie: {note.endDate}</strong> : null}
            <strong>Autousuwanie po zakończeniu: {note.delete ? 'TAK' : 'NIE'}</strong>
            <strong>Przypomnienie Email: {note.email ? `TAK ${note.email}` : 'NIE'}</strong>
            <Button text='Powrót' size={ButtonSize.Small} func={goBack} />
            <Button text='Usuń' size={ButtonSize.Small} func={deleteHandler} />
        </div>
    )
}

export default ShowNote;

