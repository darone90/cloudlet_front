import React, { ChangeEvent, useState } from 'react';
import { UserChange } from '../../../../types/login.types';

import Form from './Form';

const User = () => {

    const [indentyfication, setIdentyfication] = useState<string>('');
    const [changeData, setChangeData] = useState<UserChange>({
        type: '',
        change: '',
        confirm: '',
        password: ''
    })



    const addChangeData = (event: ChangeEvent<HTMLInputElement>): void => {
        setChangeData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const changeIdentificator = (ident: string): void => {
        switch (ident) {
            case 'email':
                setChangeData({
                    type: 'email',
                    change: '',
                    confirm: '',
                    password: ''
                })
                break;
            case 'login':
                setChangeData({
                    type: 'login',
                    change: '',
                    confirm: '',
                    password: ''
                })
                break;
            case 'password':
                setChangeData({
                    type: 'hasło',
                    change: '',
                    confirm: '',
                    password: ''
                })
                break;
            default:
                setChangeData({
                    type: '',
                    change: '',
                    confirm: '',
                    password: ''
                })
                break;
        }
        setIdentyfication(ident)
    }



    const form = changeData.type === '' ? null : <Form values={changeData} func={addChangeData} />

    return (
        <div className='Change'>
            <h2>Które dane chcesz zmienić ?</h2>
            <button onClick={() => changeIdentificator('email')}>Adres Email</button>
            <button onClick={() => changeIdentificator('login')}>Login</button>
            <button onClick={() => changeIdentificator('password')}>Hasło</button>
            {form}
        </div>
    )
}

export default User