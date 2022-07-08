import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import ShortNote from './parts/SortNote';

import './Listnotes.scss';

const ListNotes = () => {

    const { notes } = useSelector((store: RootState) => store.notes);

    const list = notes.map((note, index) => <ShortNote data={note} key={index} />)

    return (
        <div className='List-notes'>
            {list}
            {list.length < 1 ? 'Aktualnie brak notatek' : null}
        </div>
    )
}

export default ListNotes