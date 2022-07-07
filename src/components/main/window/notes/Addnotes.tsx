import React, { ChangeEvent, useState } from 'react';
import { ButtonSize } from '../../../../types/components.type';
import { Note } from '../../../../types/notes.type';
import { connection } from '../../../../global/login-functions';

import Button from '../../../common/button/Button';
import CallendarForm from './parts/CallendarForm';
import Spinner from '../../../common/spinner/Spinner';

import './Addnotes.scss';

const AddNotes = () => {

    const [addCallendar, setAddCallendar] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<string>('');
    const [color, setColor] = useState<string>('black')

    const [noteData, setNoteData] = useState<Note>({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        delete: false,
        email: '',
        create: ((new Date()).toISOString()).slice(0, 10),

    });

    const addnoteData = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setNoteData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const addNoteToDatabase = async () => {
        if (noteData.title === '' || noteData.description === '') {
            setInfo('Nie podano wymaganych informacji (tytuł, opis)');
            setColor('red');
            return;
        }
        setLoading(true);
        const response = await connection(noteData, 'notes/add', 'POST');
        setLoading(false);

        if (response.status === true) {
            setInfo('Notatka została dodana');
            setColor('green');
            setNoteData({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                delete: false,
                email: '',
                create: ((new Date()).toISOString()).slice(0, 10),

            })
        } else {
            window.location.href = `/error/:${response.info}`
        }
    }
    if (loading) return <Spinner />;

    return (
        <div className='Add-notes'>
            <p style={{ color }}>{info}</p>
            <form>
                <label>
                    Tytuł <input type="text" name='title' value={noteData.title} onChange={addnoteData} />
                </label>
                <label>
                    <strong>Opis</strong>
                    <textarea cols={30} rows={10} maxLength={500} name='description' value={noteData.description} onChange={addnoteData}></textarea>
                </label>
                <label>
                    zapisać w kalendarzu ? <input type="checkbox" onChange={() => setAddCallendar(prev => !prev)} />
                </label>
                {addCallendar ? <CallendarForm func={addnoteData} data={noteData} set={setNoteData} /> : null}
                <Button text='Zapisz notatkę' size={ButtonSize.Small} func={addNoteToDatabase} />
            </form>
        </div>
    )
}

export default AddNotes