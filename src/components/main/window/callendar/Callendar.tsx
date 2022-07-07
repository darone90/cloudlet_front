import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

import './Callendar.scss';

const Callendar = () => {

    const { notes } = useSelector((store: RootState) => store.notes);

    const list = notes.map(note => ({ title: note.title, start: note.eventStart, end: note.validTo }))

    return (
        <div className='Callendar'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={list}
            />
        </div>
    )
}

export default Callendar