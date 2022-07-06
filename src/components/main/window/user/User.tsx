import React, { ChangeEvent, useState } from 'react';
import { UserChange } from '../../../../types/login.types';
import { connection, getSession, setSession } from '../../../../global/login-functions';
import { ButtonSize } from '../../../../types/components.type';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../../features/login-slice';

import Form from './Form';
import Spinner from '../../../common/spinner/Spinner';
import Button from '../../../common/button/Button';

import './User.scss';

const User = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false)
    const [information, setInformation] = useState<string>('Prosze wprowadzić dane')
    const [color, setColor] = useState<string>('black')
    const [changeData, setChangeData] = useState<UserChange>({
        type: '',
        change: '',
        confirm: '',
        password: ''
    });

    const logout = () => {
        setSession({ token: null, user: null, login: false });
        dispatch(appLogin({ loginStatus: false, token: null }));
        window.location.href = '/'
    }

    const userDelete = async () => {
        if (window.confirm('Konto zostanie usunięte bezpowrotnie! Kontynuować ?')) {
            const id = getSession().token;
            const response = await connection({}, `users/change/${id}`, 'DELETE');
            if (response.status === false) {
                window.location.href = `/error/:${response.info}`;
            } else {
                logout()
            }
        } else {
            return
        }
    }

    const dataChangeHandler = async () => {
        if (!changeData.type || !changeData.change || !changeData.confirm || !changeData.password) {
            setInformation('nie wszytskie wymagane pola zostały uzupełnione');
            setColor('red')
            return
        }
        if (changeData.type === 'email' && (changeData.change.length > 60 || changeData.change.length < 5)) {
            setInformation('adres mail nie może przekraczać 60 znaków i być mniejszy niż 5');
            setColor('red')
            return
        }
        if (changeData.type === 'login' && (changeData.change.length > 40 || changeData.change.length < 3)) {
            setInformation('login nie może przekraczać 40 znaków i być mniejszy niż 3');
            setColor('red')
            return
        }
        if (changeData.type === 'hasło' && (changeData.change.length > 30 || changeData.change.length < 8)) {
            setInformation('hasło nie może przekraczać 30 znaków i być mniejsz niż 8');
            setColor('red')
            return
        }
        if (changeData.change !== changeData.confirm) {
            setInformation('potwierdzenie mie zgadza się z podaną wartością');
            setColor('red')
            return
        }

        setLoading(true)
        const response = await connection(changeData, 'users/change', 'PATCH')
        setLoading(false);

        if (response.status === true) {
            setInformation('dane zapisane poprawnie, wymagane ponowne logowanie, automatyczne wylogowanie nastąpi za 5 sekund');
            setColor('green');
            setChangeData(prev => ({
                ...prev,
                change: '',
                confirm: '',
                password: ''
            }))
            setTimeout(() => {
                logout()
            }, 5000)
        } else {
            window.location.href = `/error/:${response.info}`
        }
    }

    const addChangeData = (event: ChangeEvent<HTMLInputElement>): void => {
        setChangeData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const changeIdentificator = (id: string) => {
        setChangeData(prev => ({
            ...prev,
            type: id
        }))
    }

    if (loading) return <Spinner />;

    const form = changeData.type === '' ? null : <Form values={changeData} func={addChangeData} color={color} information={information} />

    return (
        <div className='Change'>
            <h3>Które dane chcesz zmienić ?</h3>
            <div className="Change__buttons">
                <Button text='Adres Email' size={ButtonSize.Small} func={() => changeIdentificator('email')} />
                <Button text='Login' size={ButtonSize.Small} func={() => changeIdentificator('login')} />
                <Button text='Hasło' size={ButtonSize.Small} func={() => changeIdentificator('password')} />
            </div>
            {form}
            {form ? <Button text='zapisz' size={ButtonSize.Small} func={dataChangeHandler} /> : null}
            <Button text='Usuń konto' size={ButtonSize.Important} func={userDelete} />
        </div>
    )
}

export default User