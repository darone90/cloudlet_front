import React, { ChangeEvent } from 'react';
import { Note } from '../../../../../types/notes.type';

interface Props {
    func: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    data: Note;
}

const EmailRemind = (props: Props) => {

    const { data, func } = props;

    return (
        <div>
            <label>
                kiedy wysłać powiadomienie? <input type="date" min={data.create} max={data.endDate} value={data.email} onChange={func} name='email' />
            </label>
        </div>
    )
}

export default EmailRemind