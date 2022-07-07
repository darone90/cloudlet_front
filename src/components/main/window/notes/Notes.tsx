import React, { useState } from 'react';
import { ButtonSize } from '../../../../types/components.type';

import AddNotes from './Addnotes';
import ListNotes from './Listnotes';
import Button from '../../../common/button/Button';

const Notes = () => {

    const [noteToggle, setNoteToggle] = useState<boolean>(false)

    return (
        <div className='Notes'>
            <Button text={noteToggle ? 'Pokaż notatki' : 'Zrób notatkę'} size={ButtonSize.Small} func={() => setNoteToggle(prev => !prev)} />
            {noteToggle ? <AddNotes /> : <ListNotes />}
        </div>
    )
}

export default Notes