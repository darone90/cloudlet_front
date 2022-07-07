import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

import ShortNote from './parts/SortNote';

const ListNotes = () => {

    const { notes } = useSelector((store: RootState) => store.notes);

    const list = notes.map(note => <ShortNote data={note} />)

    return (
        <div className='List-notes'>
            {list}
        </div>
    )
}

export default ListNotes