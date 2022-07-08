import React, { useState } from 'react';
import { shortNote } from '../../../../../types/notes.type';
import { ButtonSize } from '../../../../../types/components.type';
import { useDispatch } from 'react-redux';
import { deleteOne } from '../../../../../features/notes-slice';
import { listDeleter } from '../../../../../global/notes-function';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../common/button/Button';
import Spinner from '../../../../common/spinner/Spinner';

import './ShortNote.scss';

interface Props {
    data: shortNote,
}

const ShortNote = (props: Props) => {

    const { title, createdAt, validTo, eventStart, id } = props.data;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const deleteNote = async () => {
        try {
            setLoading(true);
            dispatch(deleteOne(id));
            const response = await listDeleter('notes/delete', id);
            setLoading(false);
            if (response.status === false) {
                navigate(`/error/${response.info}`)
            }
        } catch (err) {
            navigate(`/error/błąd podczas usuwania... ponów prubę za chwilę`)
        }
    }

    const show = () => {
        navigate(`/notes/show/${id}`)
    }

    if (loading) return <Spinner />;

    return (
        <div className='Short-note'>
            <h3>{title}</h3>
            <small>Utworzona{createdAt}</small>
            <Button text='Usuń' size={ButtonSize.Small} func={deleteNote} />
            <Button text='Zobacz' size={ButtonSize.Small} func={show} />
            <div className="Short-note__time" style={{ display: eventStart ? 'block' : 'none' }}>
                {eventStart ? <p>Data wydarzenia: {eventStart}</p> : null}
                {validTo ? <p>Koniec wydarzenia: {validTo}</p> : null}
            </div>         
        </div>
    );
};

export default ShortNote;
