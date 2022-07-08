import React, { ChangeEvent, useState } from 'react';
import { UserChange } from '../../../../types/login.types';
import { connection, getSession, setSession } from '../../../../global/login-functions';
import { ButtonSize } from '../../../../types/components.type';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../../features/login-slice';
import { dataValidation } from './dataChangeValidation.function';
import { useNavigate } from 'react-router-dom';

import Form from './Form';
import Spinner from '../../../common/spinner/Spinner';
import Button from '../../../common/button/Button';

import './User.scss';

const initialState = {
    type: '',
    change: '',
    confirm: '',
    password: ''
}

const User = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)
    const [information, setInformation] = useState<string>('Prosze wprowadzić dane')
    const [color, setColor] = useState<string>('black')
    const [changeData, setChangeData] = useState<UserChange>(initialState);

    const logout = () => {
        setSession({ token: null, user: null, login: false });
        dispatch(appLogin({ loginStatus: false, token: null }));
        navigate('/');
    }

    const userDelete = async () => {
        if (window.confirm('Konto zostanie usunięte bezpowrotnie! Kontynuować ?')) {
            const id = getSession().token;
            const response = await connection({}, `users/change/${id}`, 'DELETE');
            if (response.status === false) {
                navigate(`/error/:${response.info}`);
            } else {
                logout()
            }
        } else {
            return
        }
    }

    const dataChangeHandler = async () => {

        if (!dataValidation(setColor, setInformation, changeData)) return;

        setLoading(true)
        const response = await connection(changeData, 'users/change', 'PATCH')
        setLoading(false);

        if (response.status === true) {
            setInformation('dane zapisane poprawnie, wymagane ponowne logowanie, automatyczne wylogowanie nastąpi za 5 sekund');
            setColor('green');
            setChangeData(prev => ({ ...initialState, type: prev.type }))
            setTimeout(() => {
                logout()
            }, 5000)
        } else {
            navigate(`/error/:${response.info}`)
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