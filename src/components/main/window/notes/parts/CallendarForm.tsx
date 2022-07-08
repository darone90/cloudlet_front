import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Note } from '../../../../../types/notes.type';

import EmailRemind from './EmailRemind';

interface Props {
    func: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    data: Note;
    set: Dispatch<SetStateAction<Note>>;
}

const CallendarForm = (props: Props) => {

    const { data, func, set } = props;
    const [addmail, setAddmail] = useState<boolean>(false);

    return (
        <div>
            <label>
                Początek wydarzenia <input type="date" name='startDate' value={data.startDate} onChange={func} min={data.create} />
            </label>
            <label>
                Koniec wydarzenia <input type="date" name='endDate' value={data.endDate} onChange={func} min={data.startDate} />
            </label>
            <label>
                Usunąć po wydarzeniu? <input type="checkbox" name='delete' onChange={() => set(prev => ({ ...prev, delete: !prev.delete }))} />
            </label>
            <label>
                ustawić przypomnienie mail? <input type="checkbox" onChange={() => setAddmail(prev => !prev)} />
            </label>
            {addmail ? <EmailRemind func={func} data={data} /> : null}
        </div>
    );
};

export default CallendarForm;