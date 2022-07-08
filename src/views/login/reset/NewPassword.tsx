import React, { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { connection, getconnection } from '../../../global/login-functions';
import { Link, useParams } from 'react-router-dom';
import { ButtonSize } from '../../../types/components.type';
import { dataValidation } from './dataValidation.function';

import Spinner from '../../../components/common/spinner/Spinner';
import Button from '../../../components/common/button/Button';

import './NewPassword.scss';

export interface Password {
    password: string;
    confirm: string;
    code: string
}

const NewPassword = () => {

    const { code } = useParams();

    const initialState = {
        password: '',
        confirm: '',
        code: code as string
    }

    const [password, setPassword] = useState<Password>(initialState)

    const [loading, setLoading] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [info, setInfo] = useState<string>('');
    const [color, setColor] = useState<string>('black');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await getconnection(code as string, 'users/reset')
            setLoading(false);
            if (response.status === true) {
                setConfirm(true)
            } else {
                setConfirm(false)
            }
        })()
    }, [code])

    const sendNewPassword = async (e: MouseEvent<HTMLButtonElement>) => {

        if (!dataValidation(setColor, setInfo, password)) return;

        setLoading(true);
        const response = await connection(password, 'users/reset', 'PUT');
        setLoading(false);
        if (response.status === true) {
            setColor('green');
            setInfo(response.info);
        } else {
            setColor('red');
            setInfo(response.info);
        }
        setPassword(initialState)
    }

    const addPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    if (loading) return <Spinner />;

    const show = confirm ?
        <form>
            <label>
                podaj nowe hasło: <input type="password" name='password' value={password.password} onChange={addPassword} />
            </label>
            <label>
                potwierdź nowe hasło: <input type="password" name='confirm' value={password.confirm} onChange={addPassword} />
            </label>
            <Button text='Zapisz zmiany' size={ButtonSize.Small} func={sendNewPassword} />
        </form>
        : <strong>Taki użytkownik nie istnieje w bazie</strong>


    return (
        <div className='Reset-password'>
            {show}
            <div style={{ color }}>
                {info}
            </div>
            <button className="signup__return"><Link to={'/'} >Powrót do logowania</Link></button>
        </div>
    );
};

export default NewPassword