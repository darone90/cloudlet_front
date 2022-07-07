import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Note } from '../../../../types/notes.type';
import { getOneNote, listDeleter } from '../../../../global/notes-function';
import { ButtonSize } from '../../../../types/components.type';
import { deleteOne } from '../../../../features/notes-slice';

import Spinner from '../../../common/spinner/Spinner';
import Button from '../../../common/button/Button';
import { useDispatch } from 'react-redux';

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
            navigate(`/error/błąd podczas pobierania notatki.`)
        }
    }

    useEffect(() => {
        (async () => {
            await getNote();
            setLoading(false);
        })()
    }, [])

    const goBack = () => {
        navigate(-1)
    };

    const deleteHandler = async () => {
        try {
            setLoading(true);
            dispatch(deleteOne(id as string));
            const response = await listDeleter('notes/delete', id as string);
            setLoading(false);
            if (response.status === false) {
                navigate(`/error/${response.info}`)
            }
        } catch (err) {
            navigate(`/error/błąd podczas usuwania... ponów prubę za chwilę`)
        }
    };


    if (loading) return <Spinner />;

    return (
        <div className='Show-notes'>
            <h2>{note.title}</h2>
            <h3>Utworzona: {note.create}</h3>
            <p>{note.description}</p>
            {note.startDate ? <strong>Początek wydarzenia: {note.startDate}</strong> : null}
            {note.endDate ? <strong>Zakończenie: {note.endDate}</strong> : null}
            <p>Autousuwanie po zakończeniu: {note.delete ? 'TAK' : 'NIE'}</p>
            <p>Przypomnienie Email: {note.email ? `TAK ${note.email}` : 'NIE'}</p>
            <Button text='Powrót' size={ButtonSize.Small} func={goBack} />
            <Button text='Usuń' size={ButtonSize.Small} func={deleteHandler} />
        </div>
    )
}

export default ShowNote;

