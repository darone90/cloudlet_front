import React, { ChangeEvent, useState } from 'react';
import { UserChange } from '../../../../types/login.types';
import { connection } from '../../../../global/login-functions';

import Form from './Form';
import Spinner from '../../../common/spinner/Spinner';

const User = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [information, setInformation] = useState<string>('Prosze wprowadzić dane')
    const [color, setColor] = useState<string>('black')
    const [changeData, setChangeData] = useState<UserChange>({
        type: '',
        change: '',
        confirm: '',
        password: ''
    })

    const dataChangeHandler = async () => {
        if (!changeData.type || !changeData.change || !changeData.confirm || !changeData.password) {
            setInformation('nie wszytskie wymagane pola zostały uzupełnione');
            setColor('red')
            return
        }
        if (changeData.type === 'email' && changeData.change.length > 60) {
            setInformation('adres mail nie może przekraczać 60 znaków');
            setColor('red')
            return
        }
        if (changeData.type === 'login' && changeData.change.length > 40) {
            setInformation('login nie może przekraczać 40 znaków');
            setColor('red')
            return
        }
        if (changeData.type === 'hasło' && changeData.change.length > 30) {
            setInformation('hasło nie może przekraczać 30 znaków');
            setColor('red')
            return
        }
        if (changeData.change !== changeData.confirm) {
            setInformation('potwierdzenie mie zgadza się z podaną wartością');
            setColor('red')
            return
        }

        setLoading(true)
        const responese = await connection(changeData, 'user/change', 'PATCH')
        setLoading(false);

        if (!responese.status) {
            window.location.href = `/error/:${responese.info}`
        } else {
            setInformation('dane zapisane poprawnie');
            setColor('green')
        }
    }

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
    }


    if (loading) return <Spinner />;

    const form = changeData.type === '' ? null : <Form values={changeData} func={addChangeData} color={color} information={information} />

    return (
        <div className='Change'>
            <h2>Które dane chcesz zmienić ?</h2>
            <button onClick={() => changeIdentificator('email')}>Adres Email</button>
            <button onClick={() => changeIdentificator('login')}>Login</button>
            <button onClick={() => changeIdentificator('password')}>Hasło</button>
            {form}
            {form ? <button onClick={dataChangeHandler}>Zapisz</button> : null}
        </div>
    )
}

export default User